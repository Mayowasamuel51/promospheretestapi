<?php

use Illuminate\Http\Request;
use App\Http\Resources\Trending;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\MobilesController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\RecommendController;



// Recommendation API  FOR VIDEOS SOLVED  WEB  .........................
Route::get('/recommendationtop',[RecommendController::class,'recommend_top_5000']);
Route::get('/recommendationtopvideoid/{video_id}',[RecommendController::class, 'recommendationtopinfo']);

//Recommendation API FOR VIDEOS AND IMAGES FOR MOBILE .....................
Route::get('/recommendation',[MobilesController::class,'mobile_top_recommend']); 
Route::get('/recommendationimages',[MobilesController::class,'mobile_top_recommend_images']);

// IMAGES API , GLOBAL IMAGES AND USER IMAGES 


/// Trending Services   VIDEOS SOLVED  WEB and MOBILE
Route::get('/trendingservices', [HomeController::class, 'trendingservice']);
Route::get('/trending/{categories}', [HomeController::class, 'trendingprofile']);

///   TOP SERVICES PROVIDER FOR THE WEEK  API WEB and MOBILE


///   TOP MOVING SERVICES FOR THE WEEK  API   WEB and MOBILE


/// STORIES API FOR WEB AND MOBILE 



//  SEARCH AlGORITHM   For finding , categories, Sellers 
 


// categories starts
Route::get('/categories', [UserController::class, 'lastestPost']);
// search for categories .....................
Route::get('/categories/{categories}/{postid}', [UserController::class, 'searchbycategories']);
Route::get('/categories/{categories}/{user_id}', [UserController::class, 'getinfopost']);


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

Route::get('/getmore/{postid}',[UserController::class,'getmore']);  
Route::get('/getimage', [UserController::class, 'getinfopost']);

Route::get('/profile/{sellername}', [ProfileController::class,'profile']);
Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/profile/sellername', [ProfileController::class,'profile']);

    Route::post('/videos/{user_id}', [UserController::class, 'videos']);
    Route::post('/images/{user_id}', [UserController::class, 'uploadedpost']);
    Route::post('/mutipleimages/{user_id}', [UserController::class, 'uploadedmutipleimages']);

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




//// API ---- ADMIN S 
// call allemnet in eveining expalin with vera approve   it 