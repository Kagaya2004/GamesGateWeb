<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Models\Desenvolvedora;

class DesenvolvedoraController extends Controller
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

        $query = Desenvolvedora::select("*")
            ->whereNull('deleted_at')
            ->OrderBy($props, $dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();
        
        $totalPages = ceil($total / $pageSize);

        return response()->json([
            'message'=>'Relatório de Desenvolvedoras',
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
            'email'=>'required|email|string|max:255|unique:desenvolvedoras,email',
            'pais'=>'required|string|max:255|desenvolvedoras,pais',
            'site'=>'sometimes|required|string|max:255',
            'descricao'=>'required|string',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'message'=>'Erro nas informações da desenvolvedora',
                'status'=>404,
                'errors'=>$validator->errors()
            ], 404);
        }

        $data = Desenvolvedora::create([
            'nome'=>$request->nome,
            'email'=>$request->email,
            'pais'=>$request->pais,
            'site'=>$request->site,
            'descricao'=>$request->descricao,
        ]);

        return response()->json([
            'message'=>'Desenvolvedora cadastrada com sucesso',
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
            $data = Desenvolvedora::findOrfail($id);
        }
        catch (HttpResponseException $e)
        {
            response()->json([
                'message'=>$e->getMessage(),
                'status'=>404
            ], 404);
        }

        return response()->json([
            'message'=>'Desenvolvedora encontrada com sucesso',
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
            'nome'=>'required|string|max:255',
            'email'=>'required|email|string|max:255|unique:desenvolvedoras,email',
            'pais'=>'required|string|max:255|desenvolvedoras,pais',
            'site'=>'sometimes|required|string|max:255',
            'descricao'=>'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message'=>'Erro nas informações da desenvolvedora',
                'status'=>404,
                'errors'=>$validator->errors()
            ],404);
        }
        // pega o id do usuário no banco de dados
        $data = Desenvolvedora::Find($id);

        if (!$data)
        {
            return response()->json([
                'message'=>'Desenvolvedora não localizada',
                'data'=>$id,
                'status'=>404
            ],404);
        }

        $data->nome = $request->nome ?? $data->nome;
        $data->email = $request->email ?? $data->email;
        $data->pais = $request->pais ?? $data->username;
        $data->descricao = $request->descricao ?? $data->descricao;
        $data->site = $request->site ?? $data->site;

        $data->save();

        return response()->json([
            'message'=>'Desenvolvedora alterada com sucesso',
            'status'=>201,
            'data'=>$data
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Desenvolvedora::find($id);

        if (!$data)
        {
            return response()->json([
                'message'=>'Desenvolvedora não encontrada',
                'status'=>404
            ], 404);
        }

        $data->delete();

        return response()->json([
            'message'=>'Desenvolvedora deletada com sucesso',
            'status'=>200
        ], 200);
    }
}
