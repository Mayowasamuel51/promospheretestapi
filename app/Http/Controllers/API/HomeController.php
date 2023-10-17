<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    //
    //  this is Recommendations place , showing people who as paid , images and videos 
    public function recommend_top_5000(){
        // showing people who paid 5000 above , images , videos 
        // need to cut showing some infomation from database...............
        /// need to join videos and user table

        $is_paid_adove  =  DB::table('users')
        ->join('postvideos', 'users.id', '=', 'postvideos.user_id')->where('is_paid', '>', 4999)
        ->get();
        // User::where('is_paid', '>', 4999)->get();
        return response()->json([
            'status'=>200, 
            'data'=>$is_paid_adove
        ]);

    }
}
