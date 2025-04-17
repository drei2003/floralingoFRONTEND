<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'gen_user_id',
        'OrderID',
        'paymentMethod',
        'status',
        'TotalPrice',
        'Name',
        'orderedProducts',
        'deliveryDate',
        'deliveryTime',
        'shippingAdd',
        'numItems',
    ];
}

