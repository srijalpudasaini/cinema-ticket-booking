<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\ShowSeatController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function(){
    Route::put('/show/seatSelect',[ShowSeatController::class,'selectSeat']);
    Route::put('/show/seatReset',[ShowSeatController::class,'resetSeat']);
    Route::post('/booking/store',[BookingController::class,'store']);
    Route::get('/reservations',[BookingController::class,'getReservations']);
    Route::put('/cancelSeats',[BookingController::class,'cancelSeats']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/updateProfile', [AuthController::class, 'updateProfile']);
    Route::put('/changePassword', [AuthController::class, 'changePassword']);

    Route::post('/booking/buy',[BookingController::class,'buyTickets']);
    Route::get('/esewa/verify',[BookingController::class,'verifyEsewa']);

    Route::get('/tickets',[BookingController::class,'getTickets']);
    Route::get('/bookings/{id}/ticket', [BookingController::class, 'showQrCode']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/movies/{slug}',[MovieController::class,'showBySlug']);

Route::get('/movieDates',[ShowController::class,'getDates']);
Route::get('/hallsByDate',[ShowController::class,'getHallsByDate']);
Route::get('/timesByHall',[ShowController::class,'getTimesByHall']);
Route::get('/showSeats',[ShowController::class,'getShowSeats']);

Route::get('/halls', [HallController::class, 'index']);
Route::get('/movies', [MovieController::class, 'index']);

Route::middleware(['auth:sanctum',AdminMiddleware::class])->group(function () {

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::post('/user/store', [UserController::class, 'store']);
    Route::put('/user/update/{id}', [UserController::class, 'update']);
    Route::delete('/user/delete/{id}', [UserController::class, 'delete']);

    Route::get('/hall/{id}', [HallController::class, 'show']);
    Route::post('/hall/store', [HallController::class, 'store']);
    Route::put('/hall/update/{id}', [HallController::class, 'update']);
    Route::delete('/hall/delete/{id}', [HallController::class, 'delete']);

    Route::get('/shows', [ShowController::class, 'index']);
    Route::get('/show/{id}', [ShowController::class, 'show']);
    Route::post('/show/store', [ShowController::class, 'store']);
    Route::put('/show/update/{id}', [ShowController::class, 'update']);
    Route::delete('/show/delete/{id}', [ShowController::class, 'delete']);

    Route::get('/movie/{id}', [MovieController::class, 'show']);
    Route::post('/movie/store', [MovieController::class, 'store']);
    Route::put('/movie/update/{id}', [MovieController::class, 'update']);
    Route::delete('/movie/delete/{id}', [MovieController::class, 'delete']);
});

