<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
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

Route::get('hello', function (){
    return 'Hello laravel api';
});
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::apiResource('/books',[BookController::class]);

Route::get('/books', [BookController::class,'index']);
Route::post('/books', [BookController::class,'store']);
Route::get('/books/{id}', [BookController::class,'show']);
Route::put('/books/{id}', [BookController::class,'update']);
Route::delete('/books/{id}', [BookController::class,'destroy']);
