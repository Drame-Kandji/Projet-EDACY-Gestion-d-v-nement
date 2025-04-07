<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login()
{
    $credentials = request(['email', 'password']);

    try {
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Erreur de connexion'], 401);
        }

    } catch (JWTException $e) {
        return response()->json(['message' => 'Impossible de créer le token'.$e->getMessage()], 500);
    }

    $user = Auth::user();
    $role = $user->roles;

    return response()->json([
        'token' => $token,
        'user' => $user,
        'role' => $role[0]->name ?? null,
        'message' => 'Connexion réussie'
    ]);
}


    public function logout(){
        auth::logout();
        return response()->json([
            'message' => 'Deconnexion reussi',

        ]);
    }

    public function register(AuthRequest $request){
       // return $request->validated();
       try{
            $user = User::create($request->validated());
            //return $user;
            if(!$user){
                return response()->json([
                    'message' => 'Echec de l\'inscription',
                ]);
            }
            if(!$user->hasRole( roles: 'user')){
                $user->assignRole(roles: 'user');
            }
            return response()->json([
                'status'=>200,
                'message' => 'Inscription reussi',
                'user' => ['firstName'=>$user->firstName,
                'lastName'=>$user->lastName,
                'email'=>$user->email],
                'role' => $user->getRoleNames()[0],

            ]);
       }
       catch(\Throwable $e){
            return response()->json([
                'statuts'=>422,
                'message' => 'Echec de l\'inscription',
                'error' => $e->getMessage(),
            ]);
       }
    }


}
