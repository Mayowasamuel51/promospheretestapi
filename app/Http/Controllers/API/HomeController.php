<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\HomeResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
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
            'data' => HomeResource::collection(
                DB::table('users')
                    ->join('postvideos', 'users.id', '=', 'postvideos.user_id')
                    // ->join('images', 'users.id',  '=','images.user_id')
                    ->where('is_paid', '>', 4999)
                    ->get()
            ),
            'count' => HomeResource::collection(
                DB::table('users')
                    ->join('postvideos', 'users.id', '=', 'postvideos.user_id')->where('is_paid', '>', 4999)
                    ->get()
            )->count(),
        ]);
    }

    public function recommendationtopinfo($video_id){
        // will take infomation about the video selected and other information the post related to that video ... also display the user button to able the person move or click to see the person other information..........

        // join post related to the video first 
        // then show information of that person

        $recommendvideoid = DB::table('posts')->join('postvideos', 'posts.user_id', '=', 'postvideos.user_id')->where('postvideos.user_id',$video_id)
        ->first();
        // ->get();
        return response()->json([
            'status'=>200,
            'data'=>$recommendvideoid
        ]);
        

    }
}
