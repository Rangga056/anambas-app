<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\district;
use App\Http\Controllers\ActivityController;
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
Route::middleware('auth:sanctum')->group(function () {
    //Manage User
    Route::get('/datauser', [AuthController::class, 'datauser']);
    Route::post('deleteuser/{id}', [AuthController::class, 'removeuser']);
    Route::post('verifyuser/{id}', [AuthController::class, 'verifyuser']);
    Route::get('/filteruser', [AuthController::class, 'filterdateuser']);
    Route::post('/searchuser', [AuthController::class, 'searchuser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Manage District
    Route::get('/userdistrict', [district::class, 'datauser']);
    Route::get('/district', [district::class, 'districtdata']);
    Route::post('/searchdistrict', [district::class, 'searchdistrict']);
    Route::post('/newdistrict', [district::class, 'adddistrict']);
    Route::post('/newdestination', [district::class, 'addDestination']);
    Route::post('/editdesti/{id}', [district::class, 'editDestination']);
    Route::post('/addfaq', [district::class, 'addfaq']);
    Route::post('/editfaq/{id}', [district::class, 'editfaq']);
    Route::post('/deletefaq/{id}', [district::class, 'deletefaq']);

    // Manage Site Activity
    Route::get('/useractivity', [ActivityController::class, 'datauser']);
    Route::get('/activity', [ActivityController::class, 'activitydata']);
    Route::get('/hotnews', [ActivityController::class, 'datahotnews']);
    Route::post('/newactivity', [ActivityController::class, 'addactivity']);
    Route::post('/newhotnews', [ActivityController::class, 'addhotnews']);
    Route::post('/editactivity/{id}', [ActivityController::class, 'editactivity']);
    Route::post('/edithotnews/{id}', [ActivityController::class, 'edithotnews']);
    Route::post('/deleteactivity/{id}', [ActivityController::class, 'deleteactivity']);
    Route::post('/deletehotnews/{id}', [ActivityController::class, 'deletehotnews']);
    

});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


