<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Buat user baru
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * Login user.
     */
    public function login(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        if (!Auth::attempt($request->only('username', 'password'))) {
            return response()->json(['error' => 'Invalid login credentials'], 401);
        }

        $user = User::where('username', $request->username)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    //Tampilin data user
    public function datauser()
    {
        $users = User::all();
        return response()->json([
            'data' => $users
        ]);
    }

    //Hapus User Berdasarkan ID
    public function removeuser($id)
    {
        $users = User::find($id);
        $users->delete();
        return response()->json([
            'message' => 'User has been removed',
        ]);
    }

    //Verify User Berdasarkan ID
    public function verifyuser($id)
    {
        $user = User::find($id);
        DB::table('users')
        ->where('id', $user->id)
        ->update([
            'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s', 'Asia/Jakarta'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s', 'Asia/Jakarta'),
         ]);

    return response()->json([
        'message' => 'User has been verified successfully',
    ]);
    }

    //Filter User masuk Berdasarkan tanggal
    public function filterdateuser($column = 'created_at', $order = 'desc')
{
    static $currentOrder = 'desc'; 
    if ($column === $currentOrder) {
        $order = $order === 'desc' ? 'asc' : 'desc';
    }

    $currentOrder = $order;

    $users = DB::table('users')
        ->orderBy($column, $order)
        ->get();

    return response()->json([
        'data' => $users
    ]);
}

    //Search User 
    public function searchuser(Request $request)
{
    $searchTerm = $request->input('search');

    $users = User::where('username', 'like', '%' . $searchTerm . '%')
        ->orWhere('email', 'like', '%' . $searchTerm . '%')
        ->get();
        return response()->json([
            'data' => $users
        ]);
}
}

