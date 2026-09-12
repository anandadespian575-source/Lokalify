<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wisata extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_wisata',
        'kategori',
        'lokasi',
        'harga',
        'jam_buka',
        'foto',
        'deskripsi',
    ];
}