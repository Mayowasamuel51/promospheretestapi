<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class postvideo extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'postvideos';
    protected $guarded = [];



    public function postuservidoes(){
        return $this->belongsTo(Post::class, 'user_id');
    }
}
