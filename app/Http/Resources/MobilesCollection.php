<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MobilesCollection extends ResourceCollection
{
    public $preserveKeys = true;
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
            // 'data'=>$this->collection,
            'id' => (string) $this->id,
            'attributes' => [
                'user_id' => $this->user_id,
                'name' => $this->name,
                // 'categories'=>$this->categories,
                'images'=>$this->muitpleimages,
                'postnumber' => $this->postnumber,
                'videos' => $this->videos,
                // 'created_ats' => $this->created_at/,
                // 'muitpleimages'=>$this->muitpleimages
            ],
        ];
    }
}
