<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductCategory extends Model
{
    protected $table = 'product_categories';

    protected $fillable = [
        'ProductCatID',
        'Name',
        'Description',
        'addedAt',
    ];

    protected $casts = [
        'addedAt' => 'datetime',
    ];
}
