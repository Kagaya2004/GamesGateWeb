<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\HttpRequestException;
use App\Models\User;

class UsuarioController extends Controller
{
    public function index()
    {
        // Configurações da Paginação
        $page = $request->get('page', '1'); // Página Inicial
        $pageSize = $request->get('pageSize', '10'); // Tamanho de Página (Quantos registros numa página)
        $dir = $request->get('dir', 'asc'); // Direção (Crescente ou Decrecente)
        $props = $request->get('props', 'id'); // Propriedades
        $search = $request->get('search', ''); // Pesquisa

        // Seleciona os dados do usuário
        $query = User::select('id', 'name', 'email', 'created_at', 'updated_at')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);
        
        // Quantidade de Registros
        $total = $query->count();

        // O número de registros na página
        $data = $query->offset(($page-1) * $pageSize)
            ->limit($pageSize)
            ->get();

        // Quantidade de Páginas
        $totalPages = ceil($total / $pageSize);

        return response()->json([
            'message' => 'Registro de Usuários',
            'status' => 200,
            'page' => $page,
            'pageSize' => $pageSize,
            'dir' => $dir,
            'props' => $props,
            'search' => $search,
            'total' => $total,
            'totalPages' => $totalPages,
            'data' => $data,
         ], 200);
    }

    // Função para cadastrar Usuário
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'login'=>'required|string|max:255',
            'email'=>'required|string|max:255|unique:users,email',
            'password'=>'sometimes|required|string|min:8',
            'datanascimento'=>'required|string',
            'datalogin'=>'string',
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
            $data = User::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json([
                'message'=>$e->getMessage(),
                'status'=>404
            ],404);
        }

        return response()->json([
            'message'=>"Usuário encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    // Função para Atualizar dados de um Usuário já cadastrado
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'login'=>'required|string|max:255',
            'email'=>'required|string|max:255|unique:users,email',
            //'password'=>'sometimes|required|string|min:8',
            'datanascimento'=>'required|string',
            'datalogin'=>'string',
            'descricao'=>'string',
            'status'=>'string',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'message'=>'Erro nas informações do usuário',
                'status'=>404,
                'erros'=>$validator->errors()
            ],404);
        }

        $data = User::Find($id);
        $data->name = $request->name ?? $data->name;
        $data->login = $request->login ?? $data->login;
        $data->email = $request->email ?? $data->email;
        $data->datanascimento = $request->datanascimento ?? $data->datanascimento;
        $data->datalogin = $request->datalogin ?? $data->datalogin;
        $data->descricao = $request->descricao ?? $data->descricao;
        $data->status = $request->status ?? $data->status;

        if ($request->has('password'))
        {
            $data->password = Hash::make($request->password);
        }
        
        $data->save();

        return response()->json([
            'message'=>'Usuário atualizado com sucesso',
            'status'=>201,
            'data'=>$data
        ],201);
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
