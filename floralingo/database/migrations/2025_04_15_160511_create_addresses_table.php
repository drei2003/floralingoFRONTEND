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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id('address_id'); // Primary Key
            $table->unsignedBigInteger('user_id'); // Foreign Key from gen_users

            $table->enum('region', [
                'Region I', 'Region II', 'Region III', 'Region IV-A', 'Region IV-B',
                'Region V', 'Region VI', 'Region VII', 'Region VIII',
                'Region IX', 'Region X', 'Region XI', 'Region XII',
                'CAR', 'BARMM', 'NCR', 'CARAGA'
            ]);

            $table->string('municipality_city');
            $table->string('barangay');
            $table->string('house_no');
            $table->string('postal_code');

            $table->timestamps();

            // Foreign key constraint
            $table->foreign('user_id')->references('id')->on('gen_users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
