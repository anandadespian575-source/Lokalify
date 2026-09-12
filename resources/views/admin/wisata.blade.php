<form action="{{ route('wisata.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <div class="form-group mb-3">
        <label for="nama_wisata">Nama Tempat Wisata</label>
        <input type="text" name="nama_wisata" class="form-control" placeholder="Ecopark Curug Tiga" required>
    </div>

    <div class="form-group mb-3">
        <label for="kategori">Kategori</label>
        <select name="kategori" class="form-control" required>
            <option value="Alam">Alam</option>
            <option value="Pantai">Pantai</option>
            <option value="Gunung">Gunung</option>
            <option value="Kuliner">Kuliner</option>
            <option value="Budaya">Budaya</option>
            <option value="Sejarah">Sejarah</option>
        </select>
    </div>

    <div class="form-group mb-3">
        <label for="lokasi">Lokasi</label>
        <input type="text" name="lokasi" class="form-control" placeholder="Rancabali, Kabupaten Bandung" required>
    </div>

    <div class="form-group mb-3">
        <label for="harga">Harga Tiket</label>
        <input type="number" name="harga" class="form-control" placeholder="25000" required>
    </div>

    <div class="form-group mb-3">
        <label for="jam_buka">Jam Buka</label>
        <input type="text" name="jam_buka" class="form-control" placeholder="08:00 - 17:00" required>
    </div>

    <div class="form-group mb-3">
        <label for="foto">Upload Foto Utama</label>
        <input type="file" name="foto" class="form-control" accept="image/*" required>
    </div>

    <div class="form-group mb-3">
        <label for="deskripsi">Deskripsi Lokasi</label>
        <textarea name="deskripsi" class="form-control" rows="4" placeholder="Detail lokasi, jenis wisata, cocok untuk siapa..."></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Tambahkan Wisata Sekarang</button>
</form>