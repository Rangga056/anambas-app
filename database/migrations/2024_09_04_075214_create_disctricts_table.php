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
        Schema::create('disctricts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('userID');
            $table->uuid('highlightID');
            $table->foreign('userID')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('highlightID')->references('id')->on('highlights')->cascadeOnDelete();
            $table->string('heroIMG')->nullable(false);
            $table->string('disctrictName')->nullable(false);
            $table->string('disctrictDescription')->nullable(false);
            $table->string('location')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disctricts');
    }
};
