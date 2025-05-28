<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Models\Genero;

class GeneroController extends Controller
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

        $query = Genero::select("*")
            ->whereNull('deleted_at')
            ->OrderBy($props, $dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();
        
        $totalPages = ceil($total / $pageSize);

        return response()->json([
            'message'=>'Relatório de Gêneros',
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
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'message'=>'Erro nas informações do gênero',
                'status'=>404,
                'errors'=>$validator->errors()
            ], 404);
        }

        $data = Genero::create([
            'nome'=>$request->nome
        ]);

        return response()->json([
            'message'=>'Gênero cadastrado com sucesso',
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
            $data = Genero::findOrfail($id);
        }
        catch (HttpResponseException $e)
        {
            response()->json([
                'message'=>$e->getMessage(),
                'status'=>404
            ], 404);
        }

        return response()->json([
            'message'=>'Gênero encontrado com sucesso',
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message'=>'Erro nas informações do Gênero',
                'status'=>404,
                'errors'=>$validator->errors()
            ],404);
        }
        // pega o id do usuário no banco de dados
        $data = Genero::Find($id);

        if (!$data)
        {
            return response()->json([
                'message'=>'Gênero não localizado',
                'data'=>$id,
                'status'=>404
            ],404);
        }

        $data->nome = $request->nome ?? $data->nome;

        $data->save();

        return response()->json([
            'message'=>'Gênero alterado com sucesso',
            'status'=>201,
            'data'=>$data
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Genero::find($id);

        if (!$data)
        {
            return response()->json([
                'message'=>'Gênero não encontrado',
                'status'=>404
            ], 404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Gênero deletado com sucesso',
            'status'=>200
        ], 200);
    }
}
