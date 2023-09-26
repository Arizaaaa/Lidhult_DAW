<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use App\Models\Student;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request) { // Función de login

        try{

            $request->validate([
                'dato' => 'required',
                'password' => 'required',
            ]);

            $prof = false;
            $stud = false;

            $user = Student::where("email", "=", $request->dato)->first(); // Comprueba que el email o nick lo use un estudiante
            if(!isset($user->id)) { $user = Student::where("nick", "=", $request->dato)->first(); }

            if (!isset($user->id)) { // Si un estudiante no usa el email o nick...

                $user = Professor::where("email", "=", $request->dato)->first(); // Comprueba que el email o nick lo use un profesor
                if(!isset($user->id)) { $user = Professor::where("nick", "=", $request->dato)->first(); }

                if(!isset($user->id) || !password_verify($request->password, $user->password)) { abort(500); } // Si no esta usado o la contraseña es errónea, devuelve error
                else {
                    $token = $user->createToken("auth_token");
                    $prof = true; 
                }
            } else {

                if(!password_verify($request->password, $user->password)) { abort(500); } // Si el email o nick lo usa un estudiante, devuelve error
                else {
                    $token = $user->createToken("auth_token");
                    $stud = true; 
                }   
            }

            if($prof) { 

                $token2 = DB::select('select * from personal_access_tokens where tokenable_type = ? and tokenable_id = ?', ['App\\Models\\Professor', $user->id]); 
                $user2 = DB::select('select * from professors where id = ?', [$user->id]);
                
            } else if($stud) { 

                $token2 = DB::select('select * from personal_access_tokens where tokenable_type = ? and tokenable_id = ?', ['App\\Models\\Student', $user->id]); 
                $user2 = DB::select('select * from students where id = ?', [$user->id]);
            }
            
            return response()->json([
                "status" => 1,
                "msg" => "Login exitoso!",
                "data" => $user2,
                "access_token" => $token2[0]->token,
            ]);

        } catch (Exception $e) {

            return response()->json([
                "status" => 0,
                "msg" => "No se ha logueado! + $e",
            ]);
        }
    }

    public function logout(Request $request) {

        try{
            
            DB::beginTransaction();
            $request->validate([
                'token' => 'required',
            ]);

            DB::table('personal_access_tokens')->where('token', $request->token)->delete();
            DB::commit();

            return response()->json([
                "status" => 1,
                "msg" => "Se ha cerrado la sesión", 
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido cerrar la sesión! + $e",
            ]);
        }       
    }

    public function autoLogin(Request $request) {

        try{

            $request->validate([
                'access_token' => 'required',
            ]);

            $token = DB::select('select * from personal_access_tokens where token = ?', [$request->access_token]);

            if($token[0]->tokenable_type == 'App\\Models\\Student') {

                $user = DB::select('select * from students where id = ?', [$token[0]->tokenable_id]);

            } else if($token[0]->tokenable_type == 'App\\Models\\Professor') {

                $user = DB::select('select * from professors where id = ?', [$token[0]->tokenable_id]);
                
            } else { abort(500); }

           

            return response()->json([
                "status" => 1,
                "msg" => "Reinicio",
                "data" => $user,

            ]);

        } catch(Exception $e) {

            return response()->json([
                "status" => 1,
                "msg" => "Error",
                "data" => $request->access_token
                ]);
        }

    }
}
