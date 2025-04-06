<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Evenement extends Model
{
    use hasFactory;
    protected $fillable = [
        'title',
        'description',
        'date',
        'location',
        'image',
        'heure',
        'category',
        'attendees'

    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}
