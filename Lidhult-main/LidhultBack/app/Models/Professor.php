<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Professor extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "professors";

    protected $fillable = [
        'name',
        'surnames',
        'email',
        'nick',
        'password',
        'character_id',
        'avatar',
        'center',
    ];

    public $timestamps = false;
}
