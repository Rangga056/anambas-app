<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|min:8',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:superadmin,siteadmin,districtadmin',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role, 
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user, 
        ], 201);
    }


    /**
     * Login user.
     */
    public function login(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validated->fails()) {
            return response()->json(['error' => $validated->errors()], 422);
        }

        $credentials = $validated->validated();

        if (Auth::attempt(['username' => $credentials['username'], 'password' => $credentials['password']])) {
            $user = Auth::user();
            $token = Str::random(60); 
            $user->token = $token;
            $user->save(); 

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'role' => $user->role 
            ], 201);
        }

        return response()->json([
            'message' => 'Invalid credentials, Wrong username or password'
        ], 401);
    }

    public function getUser()
    {
        // Mendapatkan pengguna yang terautentikasi
        $user = Auth::user();

        // Jika pengguna tidak terautentikasi
        if (!$user) {
            return response()->json([
                'errors' => [
                    'message' => [
                        'unauthorized'
                    ]
                ]
            ], 401);
        }

        // Mengembalikan data pengguna
        return response()->json([
            'user' => $user
        ]);
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }
}
