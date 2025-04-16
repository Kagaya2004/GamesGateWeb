<?php
# Para criar o arquivo api.php, basta realizar o comando no terminal:
# php artisan install:api

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/user/index', [UsuarioController::class, 'index']);
Route::get('/user/show/{id}', [UsuarioController::class, 'show']);
Route::post('/user/store', [UsuarioController::class, 'store']);
Route::delete('/user/destroy/{id}', [UsuarioController::class, 'destroy']);