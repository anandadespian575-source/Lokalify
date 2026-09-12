<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\OpeningHourController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\WishlistController;

/*
|--------------------------------------------------------------------------
| API Routes - Lokalify
|--------------------------------------------------------------------------
*/

Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'API Lokalify berhasil berjalan'
    ]);
});

// Resource Routes
Route::apiResource('destinations', DestinationController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('galleries', GalleryController::class);
Route::apiResource('locations', LocationController::class);
Route::apiResource('opening-hours', OpeningHourController::class);
Route::apiResource('reviews', ReviewController::class);
Route::apiResource('wishlists', WishlistController::class);


/*
|--------------------------------------------------------------------------
| API Upload Foto ke Google Drive
|--------------------------------------------------------------------------
*/
Route::post('/upload-drive', function (Request $request) {
    $request->validate([
        'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:5048',
    ]);

    if ($request->hasFile('photo')) {
        $file = $request->file('photo');
        $fileName = time() . '_' . $file->getClientOriginalName();

        // Menyimpan file ke disk google (Folder ID: 1qSxQEa_Tm43S6BN-rIwVlxnk4yNfFDSx)
        // Pastikan config/filesystems.php sudah diset menggunakan driver google drive
        $path = $file->storeAs('', $fileName, 'google');
        $url = Storage::disk('google')->url($path);

        return response()->json([
            'success' => true,
            'message' => 'Foto berhasil diunggah ke Google Drive!',
            'file_name' => $fileName,
            'file_url' => $url,
            'folder_link' => 'https://drive.google.com/drive/folders/1qSxQEa_Tm43S6BN-rIwVlxnk4yNfFDSx'
        ]);
    }

    return response()->json(['success' => false, 'message' => 'Gagal mengunggah foto.'], 400);
});


/*
|--------------------------------------------------------------------------
| Authentication Route
|--------------------------------------------------------------------------
*/
Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

    $users = [
        ['username' => 'admin', 'password' => 'admin123', 'role' => 'admin'],
        ['username' => 'user', 'password' => 'user123', 'role' => 'user'],
    ];

    $foundUser = collect($users)->firstWhere('username', $credentials['username']);

    if (!$foundUser || $foundUser['password'] !== $credentials['password']) {
        return response()->json([
            'success' => false,
            'message' => 'Username atau password salah!'
        ], 401);
    }

    return response()->json([
        'success' => true,
        'role' => $foundUser['role'],
        'redirect' => $foundUser['role'] === 'admin' ? '/admin/dashboard' : '/'
    ]);
});


/*
|--------------------------------------------------------------------------
| Gemini AI Chatbot Route
|--------------------------------------------------------------------------
*/
Route::post('/chat-ai', function (Request $request) {
    $userMessage = $request->input('message');

    if (!$userMessage) {
        return response()->json(['error' => 'Pesan tidak boleh kosong'], 400);
    }

    $apiKey = env('GEMINI_API_KEY');
    $daftarWisata = "1. Kawah Putih\n2. Ranca Upas\n3. Situ Patenggang & Glamping Lakeside";

    $systemInstruction = "Kamu adalah asisten AI khusus untuk website wisata Lokalify. "
        . "Daftar destinasi resmi:\n" . $daftarWisata . "\n\n"
        . "ATURAN UTAMA:\n"
        . "1. Kamu HANYA boleh menjawab pertanyaan seputar wisata di daftar tersebut.\n"
        . "2. Jika di luar itu, tolak dengan sopan.";

    try {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}", [
            'contents' => [
                ['role' => 'user', 'parts' => [['text' => $userMessage]]]
            ],
            'systemInstruction' => [
                'parts' => [['text' => $systemInstruction]]
            ]
        ]);

        if ($response->failed()) {
            return response()->json(['reply' => 'Maaf, gagal terhubung ke layanan AI.'], 500);
        }

        $data = $response->json();
        $botReply = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Maaf, saya tidak memahami pertanyaan tersebut.';

        return response()->json(['reply' => $botReply]);
    } catch (\Exception $e) {
        return response()->json(['reply' => 'Terjadi masalah pada server AI.'], 500);
    }
});