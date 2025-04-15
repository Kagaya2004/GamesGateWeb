<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsuarioController extends Controller
{
    public function index()
    {
        return response()->json([
            'message'=>'Acessando Controlador de Usuário',
            'status'=>200
        ],200);
    }

    // Função para cadastrar Usuário
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'login'=>'required|string|max:255',
            'email'=>'required|string|max:255|unique:users,email',
            'password'=>'sometimes|required|string|min:8',
            'datanascimento'=>'required|datetime',
            'datalogin'=>'datetime',
            'descricao'=>'string',
            'status'=>'string',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'message'=>'Erro nas informações do usuário',
                'status'=>404,
                'errors'=>$validator->errors()
            ],404);
        }

        $data = User::create([
            'name'=>$request->name,
            'login'=>$request->login,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'datanascimento'=>$request->datanascimento,
            'datalogin'=>$request->datalogin,
            'descricao'=>$request->descricao,
            'status'=>$request->status,
        ]);

        return response()->json([
            'message'=>'Usuário cadastrado com sucesso',
            'status'=>200,
            'data'=>$data
        ],200);
    }

    // Procurar por Usuário através do ID
    public function show(Request $request, string $id)
    {
        try
        {
            $data = User::findOrfail($id);
        }
        catch (HttpResponseException $e)
        {
            response()->json([
                'message'=>$e->GetMessage(),
                'status'=>404
            ],404);
        }

        return response()->json([
            'message'=>'Usuário encontrado com sucesso',
            'status'=>200,
            'data'=>$data
        ],200);
    }

    // Função para Atualizar dados de um Usuário já cadastrado
    public function update()
    {

    }

    // Função para Apagar um Usuário do Banco de Dados
    public function destroy(Request $request, string $id)
    {
        $data = User::find($id);

        if (!$data)
        {
            return response()->json([
                'message'=>'Usuário não encontrado',
                'status'=>404
            ],404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Usuário excluído com sucesso',
            'status'=>200
        ],200);
    }
}
