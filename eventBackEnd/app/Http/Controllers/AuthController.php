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
       }catch(Exception $e){
            return response()->json([
                $e->getMessage()
            ]);
       }
    }
}
