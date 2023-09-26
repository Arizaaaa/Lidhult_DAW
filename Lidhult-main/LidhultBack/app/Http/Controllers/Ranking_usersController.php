<?php

namespace App\Http\Controllers;

use App\Models\Ranking_user;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Ranking_usersController extends Controller
{

    public function create(Request $request) { // Crea un estudiante

        try{
            
            DB::beginTransaction();
            $request->validate([
                'ranking_id' => 'required',
                'student_id' => 'required',
            ]);

            $rep = DB::select('select * from ranking_users where ranking_id = ? and student_id = ?', [$request->ranking_id, $request->student_id]);

            if($rep == null) {
                $ranking_user = new Ranking_user();
                $ranking_user->ranking_id = $request->ranking_id;
                $ranking_user->student_id = $request->student_id;
                $ranking_user->puntuation = 0;
                $ranking_user->save();
                DB::commit();
            } else {
                abort(500);
            }


            return response()->json([
                "status" => 1,
                "msg" => "Se ha insertado!",
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido insertar! + $e",
            ]);
        }
    }

    public function indexAlf($id){ // Devuelve los usuarios del ranking deseado

        try{
            
            $ranking_users = DB::select('SELECT * 
                                        FROM students s
                                        JOIN ranking_users r
                                        WHERE s.id = r.student_id
                                        AND r.ranking_id = ?
                                        ORDER BY s.surnames ASC',

            [$id]);

            if ($ranking_users == null) {abort(500);} // Devuelve error si el ranking no existe

            return response()->json([
                "status" => 1,
                "data" => $ranking_users,
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha encontrado! + $e",
            ]);
        }
    }

    public function index(Request $request){ // Devuelve los usuarios del ranking deseado

        try{
            
            $request->validate([
                'ranking_id' => 'required',
            ]);


            $ranking_users = DB::select('SELECT * 
                                        FROM students s
                                        JOIN ranking_users r
                                        WHERE s.id = r.student_id
                                        AND r.ranking_id = ?
                                        ORDER BY puntuation DESC',

            [$request->ranking_id]);

            $ranking_signs = DB::select('SELECT s.student_id, s.sign_id, s.puntuation, si.*
                                        FROM student_signs s
                                        JOIN signs si
                                        WHERE s.ranking_id = ?  
                                        AND si.id = s.sign_id',

            [$request->ranking_id]);

            if ($ranking_users == null) {abort(500);} // Devuelve error si el ranking no existe

            return response()->json([
                "status" => 1,
                "data" => $ranking_users,
                "signs" => $ranking_signs,
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha encontrado! + $e",
            ]);
        }
    }

    public function update(Request $request) { // Actualiza un estudiante

        try{
            
            DB::beginTransaction();
            $request->validate([
                'ranking_id' => 'required',
                'student_id' => 'required',
                'puntuation' => 'required',
            ]);
            
            DB::update('update ranking_users set puntuation = ? WHERE ranking_id = ? AND student_id = ?',
            [$request->puntuation, $request->ranking_id, $request->student_id]);
            DB::commit();            
            
            $user = DB::select('select * FROM students WHERE email = ? OR nick = ?', [$request->email, $request->nick]);
            
            return response()->json([
                "status" => 1,
                "msg" => "Se ha actualizado!",
                "data" => $user
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido actualizar! + $e",
            ]);
        }    
        
    }

    public function delete(Request $request) { // Borra un estudiante

        try{
            
            DB::beginTransaction();
            $request->validate([
                'ranking_id' => 'required',
                'student_id' => 'required',
            ]);

            DB::table('ranking_users')->where('ranking_id', $request->ranking_id)->where('student_id', $request->student_id)->delete();
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
}
