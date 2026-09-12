<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WisataController;
use App\Http\Controllers\AiController; // Tambahkan import Controller AI kamu di sini

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// 1. Route untuk Menampilkan Halaman Utama
Route::get('/', function () {
    return view('welcome'); // Sesuaikan dengan nama blade kamu
});

// 2. Route untuk Proses Simpan/Upload Data Wisata (POST)
Route::post('/admin/wisata', [WisataController::class, 'store'])
    ->name('wisata.store');

// 3. Route untuk AI Chatbot (POST)
Route::post('/ai-chat', [AiController::class, 'chat'])
    ->name('ai.chat');