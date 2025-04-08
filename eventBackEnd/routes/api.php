<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EvenementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::apiResource('events', EvenementController::class);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::post('/role/{id}', [UserController::class, 'assignRole']);
Route::get('/monrole', [UserController::class, 'checkRole']);
Route::get('events/{id}/participants', [EvenementController::class, 'participants']);


Route::middleware('auth:api')->group(function () {
    Route::post('/events/{id}/register', [EvenementController::class, 'inscrire']);
    Route::post('/events/{id}/logout', [EvenementController::class, 'desinscrire']);

});
