<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(){
        
        $credentials= request(['email', 'password']);
        if(!$token = Auth::attempt($credentials)){
            return response()->json([
                'message' => 'Erreur de connexion'
            ]);
        }
        return response()->json([
            'token' => $token,
            'user' => Auth::user(),
            'message' => 'Connnexion reussi'
        ]);
    }

    public function logout(){
        auth::logout();
        return response()->json([
            'message' => 'Deconnexion reussi',

        ]);
    }

    public function register(AuthRequest $request){
       try{
            $user = User::create($request->validated());

            if(!$user){
                return response()->json([
                    'message' => 'Echec de l\'inscription',

                ]);
            }
            if(!$user->hasRole( 'user')){
                $user->assignRole('user');
            }
            return response()->json([
                'message' => 'Inscription reussi',
                'user' => $user,
                'role' => $user->getRoleNames(),

            ]);
       }catch(Exception $e){
            return response()->json([
                $e->getMessage()
            ]);
       }
    }
}
