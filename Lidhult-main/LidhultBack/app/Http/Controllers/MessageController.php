<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    
    public function createMessage(Request $request) { // Crea un mensaje

        try{
            
            DB::beginTransaction();
            $request->validate([
                'sender' => 'required',
                'receiver' => 'required',
                'content' => 'required',
            ]);
            
            $message = new Message();
            $message->sender = $request->sender;
            $message->receiver = $request->receiver;
            $message->content = $request->content;
            $message->save();
            DB::commit();
            
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

}
