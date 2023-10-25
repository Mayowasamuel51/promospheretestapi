<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\RecommendResource;

class RecommendController extends Controller
{
    //


    public function recommend_top_5000()
    {
        // showing people who paid 5000 above , images , videos 
        // need to cut showing some infomation from database...............
        /// need to join videos and user table

        // $is_paid_adove =  DB::table('users')
        // ->join('postvideos', 'users.id', '=', 'postvideos.user_id')->join('posts', 'users.id', '=', 'posts.user_id')->where('is_paid', '>', 4999)
        // // ->limit(2)
        // ->latest();
        $is_paid_adove =  DB::table('users')
            ->join('postvideos', 'users.id', '=', 'postvideos.user_id')->where('is_paid', '>', 4999)
            // ->limit(2)
            // >where('categories');
            ->get();
        // User::where('is_paid', '>', 4999)->get();
        
        return response()->json([
            // laptop/phone
            'data' => RecommendResource::collection(
                DB::table('users')
                    ->join('postvideos', 'users.id', 'postvideos.user_id')
                    // ->join('posts', 'users.id','posts.user_id') 
                    ->where('users.is_paid', '=', 5000)
                    ->inRandomOrder()
                    ->latest()
                    ->take(23)
                    ->lazy()
                    // ->count()
                    // ->first()
                    // ->get()
            ),
        ]);
    }

    public function recommendationtopinfo($video_id)
    {
        // will take infomation about the video selected and other information the post related to that video ... also display the user button to able the person move or click to see the person other information..........

        // join post related to the video first 
        // then show information of that person
        // a postnumber when creating a images post and videos post 
        // will that postnumber

        return response()->json([
            'status' => 200,
            'data' => RecommendResource::collection(
                DB::table('posts')
                ->join('postvideos', 'posts.user_id', '=', "postvideos.user_id")
                // ->join('users', 'posts.user_id', '=',$video_id)
                ->where('postvideos.postnumber', $video_id)
                ->where('posts.postnumber', $video_id)
                ->orderBy('posts.postnumber','desc')
                // ->latest('posts.created_at')
                ->take(1)
                ->lazy()
                    // ->get()
        )

        ]);
    }
}






