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
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/register",
     *     tags={"Auth"},
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
        Mail::to('pjanambas123@gmail.com')->send(new register($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User register successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user, 
        ], 201);
    }

        /**
     * @OA\Post(
     *     path="/api/login",
     *     tags={"Auth"},
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
                'role' => $user->role,
            ], 201);
        }

        return response()->json([
            'message' => 'Invalid credentials, Wrong username or password'
        ], 401);
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
     * @OA\get(
     *     path="/api/datauser",
     *     tags={"Auth"},
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
     * @OA\get(
     *     path="/api/getUser",
     *     tags={"Auth"},
     *     summary="API that request all data user aunthenticate to show  the data in website",
     *     description="it will get request all data to show data in website",
     *     operationId="getUser",
     *     @OA\Response(
     *         response="default",
     *         description="make request data to model users"
     *     )
     * )
     */
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
    /**
     * @OA\Post(
     *     path="/api/removeuser/{id}",
     *     tags={"Auth"},
     *     summary="API that request Paramater ID,That delete the user ",
     *     description="it will remove user base on id user",
     *     operationId="removeuser",
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
     *     tags={"Auth"},
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
     *     tags={"Auth"},
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

public function forgotpass(Request $request)
{
    $validator = Validator::make($request->all(), [
        'identifier' => 'required|string', 
    ]);
    $user = User::where('username', $request->identifier)
    ->orWhere('email', $request->identifier)
    ->first();

if (!$user) {
return response()->json(['message' => 'User not found'], 404);
}

$otp = Str::random(6);

Mail::to($user->email)->send(new passwordotp($otp));

return response()->json(['message' => 'OTP sent to your email']);
}
}

