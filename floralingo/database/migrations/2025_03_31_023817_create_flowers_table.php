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
        Schema::create('flowers', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('flower_id')->unique();
            $table->string('flower_name');
            $table->text('description');
            $table->string('scientific_name');
            $table->string('pronunciation');
            $table->date('added_at');
            $table->string('Thumbnail_url'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flowers');
    }
};
