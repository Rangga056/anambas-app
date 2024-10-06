<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\register;
use App\Mail\login;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/register",
     *     tags={"register"},
     *     summary="API that generate account for login/register",
     *     description="first it make validate username,email and password after succes it created new user create JWT and hash the password",
     *     operationId="register",
     *     @OA\Response(
     *         response="default",
     *         description="insert new data to model user"
     *     )
     * )
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }


        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        Mail::to('pjanambas123@gmail.com')->send(new register($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User register successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

        /**
     * @OA\Post(
     *     path="/api/login",
     *     tags={"login"},
     *     summary="API that auth for login",
     *     description="it's validate to database it is valid or no, if valid  it will make session and jwt and succesfull login",
     *     operationId="login",
     *     @OA\Response(
     *         response="default",
     *         description="make request data to model users"
     *     )
     * )
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
        Mail::to('pjanambas123@gmail.com')->send(new login($user));
        

        return response()->json([
            'status' => 'true',
            'message' => 'Login successful',
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

         /**
     * @OA\Get(
     *     path="/api/datauser",
     *     tags={"datauser"},
     *     summary="API that request all data to show data in website",
     *     description="it will get request all data to show data in website",
     *     operationId="datauser",
     *     @OA\Response(
     *         response="default",
     *         description="make request data to model users"
     *     )
     * )
     */
    public function datauser()
    {
        $users = User::all();
        return response()->json([
            'data' => $users
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/deleteuser/{id}",
     *     tags={"deleteuser"},
     *     summary="API that request Paramater ID,That delete the user ",
     *     description="it will remove user base on id user",
     *     operationId="deleteuser",
     *     @OA\Response(
     *         response="default",
     *         description="make request data to model users"
     *     )
     * )
     */
    public function removeuser($id)
    {
        $users = User::find($id);
        $users->delete();
        return response()->json([
            'message' => 'User has been removed',
        ]);
    }

   /**
     * @OA\Post(
     *     path="/api/verifyuser/{id}",
     *     tags={"verifyuser"},
     *     summary="API that request Paramater ID,That verify the user ",
     *     description="it will verify the user base on id and it will create timestamp on model collom email_verified_at",
     *     operationId="verifyuser",
     *     @OA\Response(
     *         response="default",
     *         description="make request data to model users"
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/searchuser",
     *     tags={"searchuser"},
     *     summary="API that request data,base on user want to see ",
     *     description="it will request data,and find the data base on username and email ",
     *     operationId="searchuser",
     *     @OA\Response(
     *         response="default",
     *         description="make request data to model users"
     *     )
     * )
     */
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

