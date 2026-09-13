<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wisata;
use App\Events\WisataCreated;

class WisataController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi Input Form
        $request->validate([
            'nama_wisata' => 'required|string|max:255',
            'kategori'    => 'required|string',
            'lokasi'      => 'required|string',
            'harga'       => 'required|numeric',
            'jam_buka'    => 'required|string',
            'foto'        => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'deskripsi'   => 'nullable|string',
        ]);

        // 2. Upload Foto ke folder 'galery' menggunakan disk 'public'
        $fotoPath = null;
        if ($request->hasFile('foto')) {
            // Tersimpan di: storage/app/public/galery/
            $fotoPath = $request->file('foto')->store('galery', 'public');
        }

        // 3. Simpan Rekaman Data Wisata ke Database
        $wisata = Wisata::create([
            'nama_wisata' => $request->nama_wisata,
            'kategori'    => $request->kategori,
            'lokasi'      => $request->lokasi,
            'harga'       => $request->harga,
            'jam_buka'    => $request->jam_buka,
            'foto'        => $fotoPath, // Hasil berupa string: "galery/nama_file.jpg"
            'deskripsi'   => $request->deskripsi,
        ]);

        // 4. Trigger Event Real-time Pusher ke Perangkat Lain
        broadcast(new WisataCreated($wisata))->toOthers();

        return redirect()->back()->with('success', 'Wisata berhasil ditambahkan!');
    }
}