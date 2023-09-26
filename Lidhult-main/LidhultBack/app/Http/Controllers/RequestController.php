<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RequestController extends Controller
{
    
    public function create(Request $request) { // Crea una solicitud

        try{

            DB::beginTransaction();
            $request->validate([
                'student_id' => 'required',
                'code' => 'required',
            ]);

            $ranking = DB::select('select * from rankings where code = ?', [$request->code]);

            $repeat = DB::select('select * from requests where ranking_id = ? and student_id = ?', [$ranking[0]->id, $request->student_id]);
            
            if($ranking != null && $repeat == null) {

                $modelsRequest = new ModelsRequest();
                $modelsRequest->ranking_id = $ranking[0]->id;
                $modelsRequest->student_id = $request->student_id;
                $modelsRequest->save();
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

    public function delete(Request $request) { // Borra un estudiante

        try{
            
            DB::beginTransaction();
            $request->validate([
                'ranking_id' => 'required',
                'student_id' => 'required',
            ]);

            DB::delete('delete from requests where ranking_id = ? and student_id = ?', [$request->ranking_id, $request->student_id]);
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

    public function read(Request $request) { // Lee las solicitudes del ranking

        try{

            $request->validate([
                'ranking_id' => 'required',
            ]);

            $modelsRequest = DB::select('SELECT id, nick
                                        FROM students s 
                                        JOIN requests r
                                        WHERE s.id = r.student_id 
                                        AND r.ranking_id = ?',
            [$request->ranking_id]);

            if($modelsRequest == null) { abort(500); }

            return response()->json([
                "status" => 1,
                "msg" => "Vista exitosa!",
                "data" => $modelsRequest,
            ]);

        } catch (Exception $e) {

            return response()->json([
                "status" => 0,
                "msg" => "No se ha encontrado! + $e",
            ]);
        }
    }
}
