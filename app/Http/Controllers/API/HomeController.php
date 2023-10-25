<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\HomeResource;
use App\Http\Resources\TrendingCollection;

class HomeController extends Controller
{
    //
    public function trending()
    {
    }
    public function trendingservice(){
        // egar loading, also people with high number like those who paid ..................
        // DB::select('select categories from  posts where categories = ?', [$services]);
        return response()->json([
            'status' => 200,
            'data' =>HomeResource::collection(
                Post::where('categories', 'laptop')->orWhere('categories', 'nail')->get()
            )
        ]);
    }

    public function trendingprofile($services){
        // showing the usrs face and link to there store
        return response()->json([
            'status' => 200,
            'data' =>
             HomeResource::collection(
                DB::table('users')->join('posts', 'users.id', '=', 'posts.user_id')->where('categories', '=', $services)->get() )
        ]);
    }

    public function userinfomation($user){
        // showing all using infomation
    }



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
            'data' => HomeResource::collection(
                DB::table('users')->join('postvideos', 'users.id', 'postvideos.user_id')->where('is_paid', '=', 5000)->get()
            ),
            'count' => HomeResource::collection(
                DB::table('users')
                    ->join('postvideos', 'users.id', '=', 'postvideos.user_id')->where('is_paid', '>', 4999)
                    ->get()
            )->count(),
        ]);
    }

    public function recommendationtopinfo($video_id)
    {
        // will take infomation about the video selected and other information the post related to that video ... also display the user button to able the person move or click to see the person other information..........

        // join post related to the video first 
        // then show information of that person

        $recommendvideoid = DB::table('posts')->join('postvideos', 'posts.user_id', '=', 'postvideos.user_id')->where('postvideos.user_id', $video_id)
            ->get();
        // ->get();
        return response()->json([
            'status' => 200,
            'data' => HomeResource::collection(
                DB::table('posts')->join('postvideos', 'posts.user_id', '=', 'postvideos.user_id')->where('postvideos.user_id', $video_id)
            ->get()
        // ->get();
            )
        ]);
    }
}




// DB::table(/'users')
// ->join('postvideos', 'users.id', '=', 'postvideos.user_id')
// // ->join('images', 'users.id',  '=','images.user_id')
// ->where('is_paid', '>', 4999)
// ->get()