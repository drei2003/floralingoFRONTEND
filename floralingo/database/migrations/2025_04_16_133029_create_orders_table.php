<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->unsignedBigInteger('gen_user_id'); // Foreign key column
            $table->foreign('gen_user_id')->references('id')->on('gen_users')->onDelete('cascade');
            
            $table->string('OrderID')->unique(); // Unique Order ID
            $table->string('paymentMethod'); // Payment Method
            $table->string('status')->default('Pending'); // Default status as Pending
            $table->decimal('TotalPrice', 10, 2); // Total Price
            $table->string('Name'); // Customer Name
            $table->text('orderedProducts'); // Comma-separated product names
            $table->date('deliveryDate'); // Delivery Date
            $table->time('deliveryTime'); // Delivery Time
            $table->text('shippingAdd'); // Shipping Address
            $table->integer('numItems'); // Number of Items
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
