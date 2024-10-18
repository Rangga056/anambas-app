<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('userID');
            $table->foreign('userID')->references('id')->on('users')->cascadeOnDelete();
            $table->string('HeroTitle')->nullable(false);
            $table->string('subtitle')->nullable(false);
            $table->string('penerbit')->nullable(false);
            $table->string('HeroIMG')->nullable(false);
            $table->string('subtitle2')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
