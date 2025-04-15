<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory;

    protected $primaryKey = 'address_id';

    protected $fillable = [
        'user_id',
        'region',
        'municipality_city',
        'barangay',
        'house_no',
        'postal_code',
    ];

    public function user()
    {
        return $this->belongsTo(GenUser::class, 'user_id');
    }
}
