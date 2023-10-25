<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
// use App\Http\Resources\Trending;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TrendingController extends Controller
{
    public function trendingprofile($services) {
        // showing the usrs face and link to there store
        $profilepage = DB::table('users')
            ->join('posts', 'users.id', '=', 'posts.user_id')
            ->where('categories', '=', $services)->get();

        return response()->json([
            'status' => 200,
            'data' =>
            //  Trending::collection(
                DB::table('users')->join('posts', 'users.id', '=', 'posts.user_id')->where('categories', '=', $services)->get()
                // )
        ]);
    }
}
