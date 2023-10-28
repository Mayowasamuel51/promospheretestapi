<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\MobilesCollection;
use App\Http\Resources\MobilesResource;

class MobilesController extends Controller
{
    //
    public function  mobile_top_recommend_images(){
        return response()->json([
            'status'=>200,
            'data' =>MobilesResource::collection(
                DB::table('users')
                    ->join('images', 'users.id', 'images.user_id')
                    ->join('postvideos','users.id','postvideos.user_id')
                    ->where('users.is_paid', '=', 5000)
                    ->inRandomOrder()
                    ->latest('users.created_at')
                    ->take(30)
                    ->lazy()
            ),
        
        ]);
    }
    public function  mobile_top_recommend(){
        /// showing people who paid 28 and 16 images and videos  randomly
        return response()->json([
            // laptop/phone
            'status'=>200,
            'data' => MobilesResource::collection(
                DB::table('users')
                    ->join('postvideos', 'users.id', 'postvideos.user_id')
                     // ->join('images', 'users.id','images.user_id')
                    // ->select('users.*', 'postvideos.created_ats', 'images.created_at')
                    //  ->join('images', 'us    ers.created_at','images.created_at') 
                    ->where('users.is_paid', '=', 5000)
                    ->inRandomOrder()
                    ->latest('users.created_at')
                    ->take(30)
                    ->lazy()
                    // ->count()
                    // ->first()
                    // ->get()
            ),
        ]);
    }
}
