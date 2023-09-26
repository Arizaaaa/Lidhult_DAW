<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CharacterController extends Controller
{

    public function search($id) {

        $character = Character::where("id", "=", $id)->first();

        return response()->json([
            "status" => 1,
            "msg" => "Vista exitosa!",
            "data" => $character
        ]);
    }

    public function indexCharacters() { // Devuelve todos los carácteres de los estudiantes

        $character = DB::select('select * FROM characters WHERE id < 43');

        return response()->json([
            "status" => 1,
            "msg" => "Vista exitosa!",
            "data" => $character
        ]);
    }

    public function indexBosses() { // Devuelve todos los carácteres de los profesores

        $character = DB::select('select * FROM characters WHERE id > 42');

        return response()->json([
            "status" => 1,
            "msg" => "Vista exitosa!",
            "data" => $character
        ]);
    }
}
