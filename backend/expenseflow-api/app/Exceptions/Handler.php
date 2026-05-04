<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontReport = [];

    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    public function register()
    {
        //
    }

    public function render($request, Throwable $exception)
    {
        if ($request->is('api/*')) {

            if ($exception instanceof \Illuminate\Validation\ValidationException) {
                return response()->json([
                    'message' => 'Erro de validação.',
                    'errors' => $exception->errors()
                ], 422);
            }

            if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
                return response()->json([
                    'message' => 'Não autenticado.'
                ], 401);
            }

            if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                return response()->json([
                    'message' => 'Registro não encontrado.'
                ], 404);
            }

            if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
                return response()->json([
                    'message' => 'Rota não encontrada.'
                ], 404);
            }

            if ($exception instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException) {
                return response()->json([
                    'message' => 'Método não permitido.'
                ], 405);
            }

            if ($exception instanceof \Exception) {
                return response()->json([
                    'message' => 'Erro interno do servidor.',
                    'error' => $exception->getMessage()
                ], 500);
            }
        }

        return parent::render($request, $exception);
    }
}