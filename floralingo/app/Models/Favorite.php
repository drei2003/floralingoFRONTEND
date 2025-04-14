<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $primaryKey = 'favorite_id';

    protected $fillable = ['user_id', 'flower_id'];

    public function flower()
    {
        return $this->belongsTo(Flower::class, 'flower_id');
    }
}
