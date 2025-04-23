<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
 use Illuminate\Http\Request;
 use Illuminate\Support\Facades\Hash;
 use Illuminate\Support\Facades\Validator;
 use Symfony\Component\HttpKernel\Exception\HttpException;
 use App\Models\Usuario;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message'=>'Acessando ao Controlador',
            'status'=>200
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|email|string|max:255|unique:users,email',
            'login'=>'required|string|max:255|unique:users,login',
            'password'=>'sometimes|required|string|min:6',
            'descricao'=>'required|string',
            'dataNascimento'=>'required|datetime',
            'dataLogin'=>'timestamps',
            'dataCriacao'=>'timestamps',
            'status'=>'string'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'message'=>'Erro nas informações do usuário',
                'status'=>404,
                'errors'=>$validator->errors()
            ], 404);
        }

        $data = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'login'=>$request->login,
            'password'=>Hash::make($request->password),
            'descricao'=>$request->descricao,
            'dataNascimento'=>$request->dataNascimento,
            'dataLogin'=>$request->dataLogin,
            'dataCriacao'=>$request->dataCriacao,
            'status'=>$request->status,
        ]);

        return response()->json([
            'message'=>'Usuário cadastro com sucesso',
            'status'=>200,
            'data'=>$data
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try
        {
            $data = User::findOrfail($id);
        }
        catch (HttpResponseException $e)
        {
            response()->json([
                'message'=>$e->getMessage(),
                'status'=>404
            ], 404);
        }

        return response()->json([
            'message'=>'Usuário encontrado com sucesso',
            'status'=>200,
            'data'=>$data
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = User::find($id);

        if (!$data)
        {
            return response()->json([
                'message'=>'Usuário não encontrado',
                'status'=>404
            ], 404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Usuário deletado com sucesso',
            'status'=>200
        ], 200);
    }
}
