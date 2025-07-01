<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Authentification
Route::post('/register', [UserAuthController::class, 'register']); // Créer un compte utilisateur
Route::post('/login', [UserAuthController::class, 'login']);       // Connexion
Route::post('/logout', [UserAuthController::class, 'logout'])->middleware('auth:sanctum'); // Déconnexion

// Utilisateur connecté
Route::get('/user', [UserController::class, 'me'])->middleware('auth:sanctum'); // Profil utilisateur

// Anecdotes
Route::get('/anecdotes', [AnecdoteController::class, 'index']); // Liste paginée d’anecdotes
Route::post('/anecdotes', [AnecdoteController::class, 'store'])->middleware('auth:sanctum'); // Créer une anecdote
Route::delete('/anecdotes/{id}', [AnecdoteController::class, 'destroy'])->middleware('auth:sanctum'); // Supprimer anecdote

// Votes
Route::post('/anecdotes/{id}/vote', [VoteController::class, 'store'])->middleware('auth:sanctum'); // Voter une anecdote

// Liste des utilisateurs
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum'); // Liste des utilisateurs

// api.php
Route::post('/anecdotes/{id}/vote', [AnecdoteController::class, 'vote'])->middleware('auth:sanctum');
Route::delete('/anecdotes/{id}', [AnecdoteController::class, 'destroy'])->middleware('auth:sanctum');
