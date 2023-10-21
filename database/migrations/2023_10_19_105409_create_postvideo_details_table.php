<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostvideoDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('postvideo_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
          
            $table->string("titleImage")->nullable();
            $table->integer("price")->nullable();
            $table->string("usedOrnew")->nullable();
            $table->string("productName")->nullable();
            $table->string("categories")->nullable();
            $table->string("description")->nullable();
            $table->string("negotiation")->nullable();
            $table->foreign("user_id")->references()->on("users")->onDelete("cascade");
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('postvideo_details');
    }
}
