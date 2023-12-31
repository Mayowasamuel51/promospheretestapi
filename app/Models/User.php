<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Payment;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'location',
        'gender',
        'phone',
        'nin',
        'BirthDate',
        'passport',
        'Language',
        'google', // Added
        'avatar', // Added
        'email',
        'password',
        'countrys',
        'price',
        'profileImage',
        'messageCompany',
        'aboutMe',
        'location',
        'brandName',
        'websiteName'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
   

    public function paymentsystem(){
        return $this->hasMany(Payment::class);
    }

    public function posts(){
        return $this->hasMany(Post::class, 'user_id');
    }

    public function postimages(){
        return $this->hasMany(Images::class, 'user_id');
    }


}
