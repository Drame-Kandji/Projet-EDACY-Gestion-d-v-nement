<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



Route::apiResource('evenements', EvenementController::class);
Route::get('/search', [EvenementController::class, 'search']);
Route::get('/filter', [EvenementController::class, 'filter']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth');
Route::post('/role/{id}', [UserController::class, 'assignRole']);
Route::get('/monrole', [UserController::class, 'checkRole']);

// Route::post('/evenement/{id}/inscrire', [EvenementController::class, 'inscrire']);
// Route::post('/evenement/{id}/desinscrire', [EvenementController::class, 'desinscrire']);
// Route::get('/mes-evenements', [EvenementController::class, 'mesEvenements']);

Route::middleware('auth:api')->group(function () {
    Route::get('/mes-evenements', [EvenementController::class, 'mesEvenements']);
    Route::post('/evenement/{id}/inscrire', [EvenementController::class, 'inscrire']);
    Route::post('/evenement/{id}/desinscrire', [EvenementController::class, 'desinscrire']);

});
