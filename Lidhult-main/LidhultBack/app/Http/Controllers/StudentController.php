<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use App\Models\Student;
use Exception;
use finfo;
use Illuminate\Support\Facades\File as FecadeFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function create(Request $request) { // Crea un estudiante
            
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

            $student = new Student();
            $student->name = $request->name;
            $student->surnames = $request->surnames;
            $student->email = $request->email;
            $student->nick = $request->nick;
            $student->password = Hash::make($request->password);
            $student->birth_date = $request->birth_date;
            $student->character_id = $request->character_id;
            $student->save();
            DB::commit();

            $token = DB::select('select * from personal_access_tokens where tokenable_type = ? and tokenable_id = ?', ['App\\Models\\Student', $student->id]); 

            return response()->json([
                "status" => 1,
                "msg" => "Se ha insertado!",
                "nick" => $student->nick,
                "pass" => $request->password,
            ]);

    }

    public function delete(Request $request) { // Borra un estudiante

        try{
            
            DB::beginTransaction();
            $request->validate([
                'id' => 'required',
            ]);

            $student = Student::findOrFail($request->id); // Verifica que el estudiante exista
            DB::table('students')->where('id', $request->id)->delete();
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

    public function update(Request $request) { // Actualiza un estudiante

        try{
            
            DB::beginTransaction();
            $request->validate([
                'id' => 'required',
                'name' => 'required',
                'surnames' => 'required',
                'email' => 'required',
                'nick' => 'required',
                'password' => 'required',
                'avatar' => '',
                'birth_date' => 'required',
                
            ]);
            $password = Hash::make($request->password); // Encripta la contraseña

            
            if($request->avatar == "") { // Si el avatar no se actualiza
            
                if($request->password == '0') { // Si el avatar no se actualiza
            
                    DB::update('update students set name = ?, surnames = ?, email = ?, nick = ?, birth_date = ? WHERE id = ?',
                    [$request->name, $request->surnames, $request->email, $request->nick, $request->birth_date, $request->id]);
                    DB::commit();

                } else{ 

                    DB::update('update students set name = ?, surnames = ?, email = ?, nick = ?, password = ?, birth_date = ? WHERE id = ?',
                    [$request->name, $request->surnames, $request->email, $request->nick, $password, $request->birth_date, $request->id]);
                    DB::commit();

                }

            } else { // Si el avatar se actualiza

                // Obtener el contenido de la imagen en base64 desde la solicitud
                $base64_image = $request->avatar;

                // Decodificar el contenido de la imagen en base64
                $decoded_image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64_image));

                // Generar un nombre de archivo único
                $filename = uniqid() . '.webp';

                // Borra el archivo actual del estudiante
                $image = DB::select('select avatar from students where id = ?', [$request->id]);
                if($image[0]->avatar != 'user_placeholder.webp') {unlink(public_path('images/custom/'.$image[0]->avatar));}

                // Guardar el archivo en la carpeta "public/images"
                $path = storage_path('../public/images/custom/' . $filename);
                file_put_contents($path, $decoded_image);

                if($request->password == '0') { // Si el avatar no se actualiza
            
                    DB::update('update students set name = ?, surnames = ?, email = ?, nick = ?, avatar = ?, birth_date = ? WHERE id = ?',
                    [$request->name, $request->surnames, $request->email, $request->nick, $filename, $request->birth_date, $request->id]);
                    DB::commit();

                } else{
                    
                    DB::update('update students set name = ?, surnames = ?, email = ?, nick = ?, password = ?, avatar = ?, birth_date = ? WHERE id = ?',
                    [$request->name, $request->surnames, $request->email, $request->nick, $password, $filename, $request->birth_date, $request->id]);
                    DB::commit();

                }
               
            }
            
            $user = DB::select('SELECT *
                              FROM students 
                              WHERE id = ?', 
                              [$request->id]);
            
            return response()->json([
                "status" => 1,
                "msg" => "Vista exitosa!",
                "data" => $user,
                "prueba"=>$request->password
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido actualizar! + $e",
            ]);
        }    
        
    }

    public function puntuation(Request $request) { // Actualiza los puntos totales del estudiante y el nivel de personaje

        try{

            DB::beginTransaction();
            $request->validate([
                'id' => 'required',
            ]);

            $puntuation = DB::select('SELECT puntuation FROM ranking_users WHERE student_id = ?', [$request->id]); // Selecciona todos los puntos

            $total = 0;

            for ($i = 0; $i < count($puntuation); $i++) { $total += $puntuation[$i]->puntuation; } // Suma todos los puntos

            $character = DB::select('SELECT c.name
                                    FROM characters c
                                    JOIN students s
                                    WHERE s.character_id = c.id
                                    AND s.id = ?',
            [$request->id]); // Selecciona el nombre del personaje del estudiante

            
            if($total >= 9000) {$lvl = 7;} // Determina el nivel según los puntos totales del estudiate
            else if($total >= 6000) {$lvl = 6;}
            else if($total >= 4000) {$lvl = 5;}
            else if($total >= 3000) {$lvl = 4;}
            else if($total >= 2000) {$lvl = 3;}
            else if($total >= 1000) {$lvl = 2;}
            else {$lvl = 1;}

            $newCharacter = DB::select('SELECT id 
                                        FROM characters
                                        WHERE name = ?
                                        AND level = ?',
            [$character[0]->name, $lvl]); // Selecciona el id del personaje actualizado por los puntos

            DB::update('update students set total_puntuation = ?, character_id = ? WHERE id = ?',
            [$total, $newCharacter[0]->id, $request->id]); // Actualiza el estudiante
            DB::commit();

            return response()->json([
                "status" => 1,
                "msg" => "Se ha actualizado!"
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido actualizar! + $e"
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

            DB::update('update students set character_id = ? WHERE email = ? OR nick = ?',
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

    public function read(Request $request) { // Lee un profesor

        $request->validate([
            'id' => 'required',
        ]);

        $user = DB::select('SELECT *
                              FROM students 
                              WHERE id = ?', 
                              [$request->id]);
        
        return response()->json([
            "status" => 1,
            "msg" => "Vista exitosa!",
            "data" => $user,
        ]);
    }
}