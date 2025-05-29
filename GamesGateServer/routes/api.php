<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\DesenvolvedoraController;
use App\Http\Controllers\JogoController;
use App\Http\Controllers\GeneroController;

Route::get('/usuario', function (Request $request) {
    return $request->usuario();
})->middleware('auth:sanctum');

Route::prefix('/usuario')->group(function(){
    Route::get('/index', [UsuarioController::class, 'index']);
    Route::get('/show/{id}', [UsuarioController::class, 'show']);
    Route::post('/store', [UsuarioController::class, 'store']);
    Route::put('/update/{id}', [UsuarioController::class, 'update']);
    Route::delete('/destroy/{id}', [UsuarioController::class, 'destroy']);
});
Route::prefix('/desenvolvedora')->group(function(){
    Route::get('/index', [DesenvolvedoraController::class, 'index']);
    Route::get('/show/{id}', [DesenvolvedoraController::class, 'show']);
    Route::post('/store', [DesenvolvedoraController::class, 'store']);
    Route::put('/update/{id}', [DesenvolvedoraController::class, 'update']);
    Route::delete('/destroy/{id}', [DesenvolvedoraController::class, 'destroy']);
});
Route::prefix('/jogo')->group(function(){
    Route::get('/index', [JogoController::class, 'index']);
    Route::get('/show/{id}', [JogoController::class, 'show']);
    Route::post('/store', [JogoController::class, 'store']);
    Route::put('/update/{id}', [JogoController::class, 'update']);
    Route::delete('/destroy/{id}', [JogoController::class, 'destroy']);
});
Route::prefix('/genero')->group(function(){
    Route::get('/index', [GeneroController::class, 'index']);
    Route::get('/show/{id}', [GeneroController::class, 'show']);
    Route::post('/store', [GeneroController::class, 'store']);
    Route::put('/update/{id}', [GeneroController::class, 'update']);
    Route::delete('/destroy/{id}', [GeneroController::class, 'destroy']);
});