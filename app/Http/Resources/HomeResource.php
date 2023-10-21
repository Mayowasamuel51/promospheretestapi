<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HomeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id'=>(string)$this->id, 
            'attributes'=>[
                'name'=>$this->name,
                'videos'=>$this->videos,
                'created_at'=>$this->created_at,
                'muitpleimages'=>$this->muitpleimages
            ],
            'relationships'=>[
                // 'id'=>(string)$this->user->id, 
                // 'user name'=>$this->users->name, 
            ]
        ];
    }
}
