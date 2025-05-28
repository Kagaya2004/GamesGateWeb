<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class JogoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $page = $request->get('page', '1');
        $pageSize = $request->get('pageSize', '5');
        $dir = $request->get('dir', 'asc');
        $props = $request->get('props', 'id');
        $search = $request->get('search', '');

        $query = Jogo::select("*")
            ->whereNull('deleted_at')
            ->OrderBy($props, $dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();
        
        $totalPages = ceil($total / $pageSize);

        return response()->json([
            'message'=>'Relatório de Jogos',
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
            'descricao'=>'required|string',
            'dataLancamento'=>'required|date',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'message'=>'Erro nas informações do jogo',
                'status'=>404,
                'errors'=>$validator->errors()
            ], 404);
        }

        $data = Jogo::create([
            'nome'=>$request->nome,
            'descricao'=>$request->descricao,
            'dataLancamento'=>$request->dataLançamento,
            'status'=>$request->status,
        ]);

        return response()->json([
            'message'=>'Jogo cadastro com sucesso',
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
            $data = Jogo::findOrfail($id);
        }
        catch (HttpResponseException $e)
        {
            response()->json([
                'message'=>$e->getMessage(),
                'status'=>404
            ], 404);
        }

        return response()->json([
            'message'=>'Jogo encontrado com sucesso',
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
            'descricao'=>'sometimes|string',
            'dataLancamento'=>'sometimes|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message'=>'Erro nas informações do jogo',
                'status'=>404,
                'errors'=>$validator->errors()
            ],404);
        }
        // pega o id do usuário no banco de dados
        $data = Jogo::Find($id);

        if (!$data)
        {
            return response()->json([
                'message'=>'Jogo não localizado',
                'data'=>$id,
                'status'=>404
            ],404);
        }

        $data->nome = $request->nome ?? $data->nome;
        $data->descricao = $request->descricao ?? $data->descricao;
        $data->dataLancamento = $request->dataLancamento ?? $data->dataLancameto;

        $data->save();

        return response()->json([
            'message'=>'Jogo alterado com sucesso',
            'status'=>201,
            'data'=>$data
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Jogo::find($id);

        if (!$data)
        {
            return response()->json([
                'message'=>'Jogo não encontrado',
                'status'=>404
            ], 404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Jogo deletado com sucesso',
            'status'=>200
        ], 200);
    }
}
