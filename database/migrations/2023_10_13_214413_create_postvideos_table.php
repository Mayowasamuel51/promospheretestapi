<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostvideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('postvideos', function (Blueprint $table) {
            $table->id();
            $table->string("videos")->nullable();
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references('id')->on("posts")->onDelete("cascade");
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
        Schema::dropIfExists('postvideos');
    }
}
