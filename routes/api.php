<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/',function(){
    return response()->json([
        'status'=>false,
        'message'=>'You are not allowed to get this acces'
    ],401);
})->name('login');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/datauser', [AuthController::class, 'datauser'])->middleware('auth:sanctum');
Route::post('deleteuser/{id}', [AuthController::class, 'removeuser']);
Route::post('verifyuser/{id}', [AuthController::class, 'verifyuser']);
Route::get('/filteruser', [AuthController::class, 'filterdateuser']);
Route::post('/searchuser', [AuthController::class, 'searchuser']);
