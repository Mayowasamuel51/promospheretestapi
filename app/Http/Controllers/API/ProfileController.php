<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //

    public function profile($sellername){
        $profile = User::where('name' , $sellername)->get();
        if($profile){
            return response()->json([
                'status'=>200, 
                'data'=>$profile
            ]); 
        }else{
            return response()->json([
                // 'status'=>200, 
                'data'=>'errror'
            ]); 
        }
    }
}
