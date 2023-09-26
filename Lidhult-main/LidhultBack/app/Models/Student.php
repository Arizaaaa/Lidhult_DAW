<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "students";

    protected $fillable = [
        'name',
        'surnames',
        'email',
        'nick',
        'password',
        'character_id',
        'avatar',
        'total_puntuation',
        'birth_date',
    ];

    public $timestamps = false;

}
