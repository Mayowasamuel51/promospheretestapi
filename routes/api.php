<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// categories starts
Route::get('/categories', [UserController::class, 'lastestPost']);
// search for categories .....................
Route::get('/categories/{categories}', [UserController::class, 'searchbycategories']);
// categories ends


/// oauth done with google
Route::get('auth', [AuthController::class, 'redirectToAuth']);
Route::get('auth/callback', [AuthController::class, 'handleAuthCallback']);

//normal auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'sighup']);


/// payment 
Route::get('/publickey', [UserController::class, 'publickey']);
Route::post('/payment', [UserController::class, 'payment']);
Route::post('/paymentupdate', [UserController::class, 'updatereference']);
Route::get('/initialize-transaction', [UserController::class, 'initializeTransaction']);

Route::get('/users/{id}', [UserController::class, 'showing']);
Route::post('/uploadpic/{id}', [UserController::class, 'uploadpic']);
Route::middleware('auth:sanctum')->group(function () {
    // update and new  user profile pics 

    Route::delete('/deletepic/{id}', [UserController::class, 'deletepic']);

    // update user infomation
    Route::put('/updateusersinfo/{id}', [UserController::class, 'updatedata']);

    // Route::post('/payment',[UserController::class, 'payment']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/user/settings/{iduser}', [UserController::class, 'updateuserinfo']);
    Route::get("/try", function () {
        return response()->json([
            "hello" => ["mani", 'thid']
        ]);
    });

    Route::apiResource('/posts', UserController::class);

    Route::post('/logout', [AuthController::class, 'logout']);
});


// Route::group(['middleware' => ['auth:sanctum']], function () {
//     Route::resource("/tasks", TaskContorller::class);
//     Route::post("/logout", [SantumController::class, 'logout']);
// });