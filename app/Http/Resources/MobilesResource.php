<?php

namespace App\Http\Resources;

use App\Models\Images;
use Illuminate\Http\Resources\Json\JsonResource;

class MobilesResource extends JsonResource
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
            'id' => (string) $this->id,
            'attributes' => [
                'user_id' => $this->user_id,
                'name' => $this->name,
                'muitpleimages'=>$this->muitpleimages,
                'postnumber' => $this->postnumber,
                'videos' => $this->videos,
                // 'created_ats' => $this->created_at/,
                // 'muitpleimages'=>$this->muitpleimages
            ],
        ];

    }

    public function testing(){

    }
}
