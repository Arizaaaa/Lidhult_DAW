<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student_sign extends Model
{
    use HasFactory;

    protected $fillable = [
        'sign_id',
        'student_id',
        'last_evaluator',
        'ranking_id',
        'puntuation',
        'last_points',
    ];
}
