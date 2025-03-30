<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function Register(Request $request)
    {
        try {
            $user=User::create([
                'firstname'=>$request->firstname,
                'lastname'=>$request->lastname,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
                'email_verified_at'=>now(),
                'remember_token'=>Str::random(10)
            ])->assignRole('utilisateur');

            Auth::login($user);
            return response()->json([
                'code '=>200,
                'message'=>'Inscription avec succes',
            ]);
        } catch (\Throwable $th) {
            return response()->json(
                $th->getMessage()
            );
        }
    }


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
         $token=Auth::attempt($credentials);
        if ($token){
            $request->session()->regenerate();
            return response()->json([
                'code '=>200,
                'message'=>'Connexion avec succes',
            ]);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
