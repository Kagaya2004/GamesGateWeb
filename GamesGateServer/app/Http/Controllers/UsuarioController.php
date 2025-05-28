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
    public function index(Request $request)
    {
        $page = $request->get('page', '1');
        $pageSize = $request->get('pageSize', '5');
        $dir = $request->get('dir', 'asc');
        $props = $request->get('props', 'id');
        $search = $request->get('search', '');

        $query = Usuario::select("*")
            ->whereNull('deleted_at')
            ->OrderBy($props, $dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();
        
        $totalPages = ceil($total / $pageSize);

        return response()->json([
            'message'=>'Relatório de Usuários',
            'status'=>200,
            'page'=>$page,
            'pageSize'=>$pageSize,
            'dir'=>$dir,
            'props'=>$props,
            'search'=>$search,
            'total'=>$total,
            'totalPages'=>$totalPages,
            'data'=>$data
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nome'=>'required|string|max:255',
            'email'=>'required|email|string|max:255|unique:usuarios,email',
            'username'=>'required|string|max:255|unique:usuarios,username',
            'password'=>'sometimes|required|string|min:6',
            'descricao'=>'required|string',
            'dataNascimento'=>'required|date',
            'dataLogin'=>'date',
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

        $data = Usuario::create([
            'nome'=>$request->nome,
            'email'=>$request->email,
            'username'=>$request->username,
            'password'=>Hash::make($request->password),
            'descricao'=>$request->descricao,
            'dataNascimento'=>$request->dataNascimento,
            'dataLogin'=>$request->dataLogin,
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
            $data = Usuario::findOrfail($id);
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
        $validator = Validator::make($request->all(),[
            'nome'=>'sometimes|required|string|max:255',
            'email'=>'sometimes|required|email|string|max:255|unique:usuarios,email',
            'username'=>'sometimes|required|string|max:255|unique:usuarios,username',
            'password'=>'sometimes|required|string|min:6',
            'descricao'=>'sometimes|string',
            'dataNascimento'=>'sometimes|date',
            'dataLogin'=>'date',
            'status'=>'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message'=>'Erro nas informações do usuário',
                'status'=>404,
                'errors'=>$validator->errors()
            ],404);
        }
        // pega o id do usuário no banco de dados
        $data = Usuario::Find($id);

        if (!$data)
        {
            return response()->json([
                'message'=>'Usuário não localizado',
                'data'=>$id,
                'status'=>404
            ],404);
        }

        $data->nome = $request->nome ?? $data->nome;
        $data->email = $request->email ?? $data->email;
        $data->username = $request->username ?? $data->username;
        $data->descricao = $request->descricao ?? $data->descricao;
        $data->dataNascimento = $request->dataNascimento ?? $data->dataNascimento;
        $data->dataLogin = $request->dataLogin ?? $data->dataLogin;
        $data->status = $request->status ?? $data->status;

        if ($request->has('password')) {
            $data->password = Hash::make($request->password);
        }

        $data->save();

        return response()->json([
            'message'=>'Usuário alterado com sucesso',
            'status'=>201,
            'data'=>$data
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Usuario::find($id);

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
