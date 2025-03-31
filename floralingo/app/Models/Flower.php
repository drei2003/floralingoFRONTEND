<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Flower extends Model
{
    use HasFactory;

        protected $table = 'flowers';

        protected $primaryKey = 'id'; 

        protected $fillable = [
            'flower_id',
            'flower_name',
            'description',
            'scientific_name',
            'pronunciation',
            'added_at',
            'Thumbnail_url', // Case-sensitive to match your data
        ];

        public $timestamps = false;
}
