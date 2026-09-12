import express from 'express'
import mysql from 'mysql2/promise'
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import cors from 'cors'
import { fileURLToPath } from 'url'

// Setup __dirname untuk ES Module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

// 1. Folder Publik agar gambar yang di-upload bisa diakses browser
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// 2. Database Pool MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',          // Sesuaikan dengan user MySQL kamu
  password: '',          // Sesuaikan dengan password MySQL kamu
  database: 'nama_database_kamu' // Sesuaikan dengan nama database kamu
})

// 3. Konfigurasi Upload Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

// ----------------------------------------------------
// A. ENDPOINT: UPLOAD GAMBAR WISATA & DENAH (FORM ADMIN)
// ----------------------------------------------------
app.post('/api/upload-destination-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File gambar wajib di-upload!" })
  }
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`
  res.json({ success: true, imageUrl })
})

// ----------------------------------------------------
// B. ENDPOINT: UPLOAD BUKTI BAYAR DANA (STATUS -> WAITING_VERIFICATION)
// ----------------------------------------------------
app.post('/api/upload-proof', upload.single('payment_proof'), async (req, res) => {
  const { transaction_id } = req.body
  if (!req.file) return res.status(400).json({ message: "File gambar wajib di-upload!" })

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`

  try {
    // Ubah status ke WAITING_VERIFICATION (Tiket QR BELUM diterbitkan)
    await db.query(
      `UPDATE transactions SET payment_proof_url = ?, payment_status = 'WAITING_VERIFICATION' WHERE id = ?`,
      [imageUrl, transaction_id]
    )
    res.json({ success: true, message: "Bukti transfer berhasil diunggah! Menunggu konfirmasi admin." })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ----------------------------------------------------
// C. ENDPOINT: ACC PEMBAYARAN BY ADMIN (TERBITKAN TIKET QR)
// ----------------------------------------------------
app.post('/api/admin/approve-payment', async (req, res) => {
  const { transaction_id } = req.body

  try {
    const [rows] = await db.query(`SELECT * FROM transactions WHERE id = ?`, [transaction_id])
    if (rows.length === 0) return res.status(404).json({ message: "Transaksi tidak ditemukan!" })

    const transaction = rows[0]

    // Set status transaksi ke PAID
    await db.query(`UPDATE transactions SET payment_status = 'PAID' WHERE id = ?`, [transaction_id])

    // Generate Token Unik untuk QR Tiket
    const qrToken = 'TICKET-' + crypto.randomBytes(6).toString('hex').toUpperCase()

    // Simpan ke tabel tourist_tickets
    await db.query(
      `INSERT INTO tourist_tickets (transaction_id, user_id, qr_code_token) VALUES (?, ?, ?)`,
      [transaction.id, transaction.user_id, qrToken]
    )

    res.json({ success: true, message: "Pembayaran terverifikasi! Tiket QR otomatis diterbitkan." })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ----------------------------------------------------
// D. ENDPOINT: AMBIL TIKET UNTUK TAB "QR SAYA / QR TERBELI"
// ----------------------------------------------------
app.get('/api/tickets/user/:user_id', async (req, res) => {
  try {
    const [tickets] = await db.query(
      `SELECT * FROM tourist_tickets WHERE user_id = ? ORDER BY created_at DESC`,
      [req.params.user_id]
    )
    res.json(tickets)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ----------------------------------------------------
// E. ENDPOINT: SCANNER PINTU MASUK (SEKALI PAKAI)
// ----------------------------------------------------
app.post('/api/scan-ticket', async (req, res) => {
  const { qr_code_token } = req.body

  try {
    const [tickets] = await db.query(
      `SELECT * FROM tourist_tickets WHERE qr_code_token = ?`,
      [qr_code_token]
    )

    if (tickets.length === 0) {
      return res.status(404).json({ success: false, message: "❌ TIKET TIDAK VALID!" })
    }

    const ticket = tickets[0]

    // Proteksi Sekali Pakai: Cek apakah tiket sudah pernah digunakan
    if (ticket.is_used === 1) {
      return res.status(400).json({ 
        success: false, 
        message: `❌ TIKET SUDAH KADALUARSA / TERPAKAI pada ${new Date(ticket.used_at).toLocaleString('id-ID')}` 
      })
    }

    // Hanguskan tiket (ubah status is_used = 1 dan simpan waktu scan)
    await db.query(
      `UPDATE tourist_tickets SET is_used = 1, used_at = NOW() WHERE id = ?`,
      [ticket.id]
    )

    res.json({ success: true, message: "✅ TIKET VALID! Silakan masuk ke lokasi wisata." })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(5000, () => console.log('Server Backend MySQL berjalan di port 5000'))