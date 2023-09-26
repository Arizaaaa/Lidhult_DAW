<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use App\Models\Student;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProfessorController extends Controller
{
    public function create(Request $request) { // Crea un profesor

            DB::beginTransaction();
            $request->validate([
                'name' => 'required',
                'surnames' => 'required',
                'email' => 'required|unique:professors|unique:students',
                'nick' => 'required|unique:professors|unique:students',
                'password' => 'required|confirmed',
                'birth_date' => 'required',
                'character_id' => 'required',
            ]);

            $professor = new Professor();
            $professor->name = $request->name;
            $professor->surnames = $request->surnames;
            $professor->email = $request->email;
            $professor->nick = $request->nick;
            $professor->password = Hash::make($request->password); // Encripta la contraseña
            $professor->center = $request->birth_date;
            $professor->character_id = $request->character_id;
            $professor->save();
            DB::commit();

            $token = DB::select('select * from personal_access_tokens where tokenable_type = ? and tokenable_id = ?', ['App\\Models\\Professor', $professor->id]); 

            return response()->json([
                "status" => 1,
                "msg" => "Se ha insertado!",
                "access_token" => $token,
                "nick" => $professor->nick,
                "pass" => $request->password,
            ]);

    }

    public function delete(Request $request) { // Borra un profesor

        try{
            
            DB::beginTransaction();
            $request->validate([
                'id' => 'required',
            ]);

            $professor = Professor::findOrFail($request->id); // Verifica que el profesor exista
            DB::table('professors')->where('id', $request->id)->delete();
            DB::commit();

            return response()->json([
                "status" => 1,
                "msg" => "Se ha eliminado!",
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido eliminar! + $e",
            ]);
        }       

    }

    public function update(Request $request) { // Actualiza un profesor

        try{
            
            DB::beginTransaction();
            $request->validate([
                'id' => 'required',
                'name' => 'required',
                'surnames' => 'required',
                'email' => 'required',
                'nick' => 'required',
                'password' => 'required',
                'avatar' => 'required',
                'birth_date' => 'required',
            ]);

            $password = Hash::make($request->password); // Encripta la contraseña

            if($request->avatar == "") { // Si el avatar no se modifica, no se actualiza

                DB::update('update professors set name = ?, surnames = ?, email = ?, nick = ?, password = ?, center = ? WHERE id = ?',
                [$request->name, $request->surnames, $request->email, $request->nick, $password, $request->birth_date, $request->id]);
                DB::commit();
            } else { // Si el avatar se actualiza se decodifica y se actualiza

                // Obtener el contenido de la imagen en base64 desde la solicitud
                $base64_image = $request->avatar;

                // Decodificar el contenido de la imagen en base64
                $decoded_image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64_image));

                // Generar un nombre de archivo único
                $filename = uniqid() . '.webp';

                // Borra el archivo actual del profesor
                $image = DB::select('select avatar from professors where id = ?', [$request->id]);
                if($image[0]->avatar != 'user_placeholder.webp') {unlink(public_path('images/custom/'.$image[0]->avatar));}

                // Guardar el archivo en la carpeta "public/images"
                $path = storage_path('../public/images/custom/' . $filename);
                file_put_contents($path, $decoded_image);

                DB::update('update professors set name = ?, surnames = ?, email = ?, nick = ?, password = ?, avatar = ?, center = ? WHERE id = ?',
                [$request->name, $request->surnames, $request->email, $request->nick, $password, $filename, $request->birth_date, $request->id]);
                DB::commit();
            }
            


            return response()->json([
                "status" => 1,
                "msg" => "Se ha actualizado!",
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido actualizar! + $e",
            ]);
        }    
        
    }

    public function character(Request $request) { // Actualiza el personaje

        try{

            DB::beginTransaction();
            $request->validate([
                'dato' => 'required',
                'character' => 'required',
            ]);

            DB::update('update professors set character_id = ? WHERE email = ? OR nick = ?',
            [$request->character, $request->dato, $request->dato]);
            DB::commit();

            return response()->json([
                "status" => 1,
                "msg" => "Se ha actualizado!",
            ]);

        } catch (Exception $e) {

            return response()->json([
                "status" => 1,
                "msg" => "No se ha podido actualizar + $e!",
            ]);

        }

    }

    public function read(Request $request)
{
    // Recupera el valor de la cookie "laravel_token"
    $token = $request->cookie('access_token');

    // Verifica si el token existe y es válido
    if ($token && Auth::guard('sanctum')->check()) {
        // Agrega el token como encabezado de autorización
        $request->headers->set('Authorization', 'Bearer ' . $token);

        return response()->json([
            "status" => 1,
            "data" => auth()->user(),
        ]);
    } else {
        return response()->json([
            "status" => 0,
            "message" => "No se pudo autenticar al usuario",
        ]);
    }
}
}