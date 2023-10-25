<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class Trending extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
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
                'productName'=>$this->productName,
                // 'videos'=>$this->videos,
                'created_at'=>$this->created_at,
                // 'muitpleimages'=>$this->muitpleimages
            ],
           
        ];
    }
}
