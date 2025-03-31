<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'id';

    protected $fillable = [
        'ProductID',
        'Price',
        'ProductName',
        'Added_at',
        'Description',
        'Thumbnail_url',
        'Availability',
        'Category',
    ];
    protected $casts = [
        'Added_at' => 'date',
    ];

}
