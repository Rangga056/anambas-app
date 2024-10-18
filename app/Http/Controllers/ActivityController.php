<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Activity;
use App\Models\Hotnews;
use App\Models\Disctrict;

class ActivityController extends Controller
{
          /**
     * @OA\get(
     *     path="/api/useractivity",
     *     tags={"sitectivity"},
     *     summary="API that request all data to show data in website",
     *     description="it will get request all data to show data in website",
     *     operationId="useractivity",
     *     @OA\Response(
     *         response="default",
     *         description="make request data to model user"
     *     )
     * )
     */
    public function datauser()
    {
        $users = User::where('role', 'siteadmin')->get();
        return response()->json([
            'data' => $users
        ]);
    }
         /**
     * @OA\get(
     *     path="/api/activitydata",
     *     tags={"sitectivity"},
     *     summary="API that request all data to show data in website",
     *     description="it will get request all data to show data in website",
     *     operationId="activitydata",
     *     @OA\Response(
     *         response="default",
     *         description="make request data to model District"
     *     )
     * )
     */
    public function activitydata()
    {
        $data = Activity::all();
        return response()->json([
            'data' => $data
        ]);
    }
           /**
     * @OA\get(
     *     path="/api/hotnews",
     *     tags={"siteactivty"},
     *     summary="API that request all data to show data in website",
     *     description="it will get request all data to show data in website",
     *     operationId="hotnews",
     *     @OA\Response(
     *         response="default",
     *         description="make request data to model siteactivty"
     *     )
     * )
     */
    public function datahotnews()
    {
        $data = Hotnews::all();
        return response()->json([
            'data' => $data
        ]);
    }
           /**
     * @OA\Post(
     *     path="/api/newactivity",
     *     tags={"siteactivty"},
     *     summary="API that create activity ",
     *     description="it will send data to database",
     *     operationId="newactivity",
     *     @OA\Response(
     *         response="default",
     *         description="sen data to model siteactivty"
     *     )
     * )
     */
    public function addactivity(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
             'user' => 'required|exists:users,id', 
            'HeroTitle' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'penerbit' => 'required|string|max:255',
            'image' => 'required',
            'subtitle2' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }


        $activity = Activity::create([
            'userID' => $request->user,
            'HeroTitle' => $request->HeroTitle,
            'subtitle' => $request->subtitle,
            'penerbit' => $request->penerbit,
            'HeroIMG' => $request->image,
            'subtitle2' => $request->subtitle2,
        ]);
       // $uploads = [];
   // if ($request->hasFile('heroIMG')) {
        // $originalFileName = pathinfo($request->file('heroIMG')->getClientOriginalName(), PATHINFO_FILENAME);
       // $safeFileName = preg_replace('/[^A-Za-z0-9\-]/', '', $originalFileName);
        // $extension = $request->file('heroIMG')->getClientOriginalExtension();
        //$imageName = $safeFileName . '.' . $extension;

        //$destinationPath = 'public/activity/image';
        //$request->file('heroIMG')->storeAs($destinationPath, $imageName);

        //$imageUrl = asset('storage/activity/image') . $imageName;
        //$uploads['heroIMG'] = $imageUrl;
        //}
       // $activity->update($uploads);
       

        return response()->json([
            'message' => 'activity Has Been added Succesfully',
        ], 201);
    }
              /**
     * @OA\Post(
     *     path="/api/editactivity/{id}",
     *     tags={"siteactivty"},
     *     summary="API that edit activity data ",
     *     description="it will edit data",
     *     operationId="editactivity",
     *     @OA\Response(
     *         response="default",
     *         description="it will request data to edit from model activity"
     *     )
     * )
     */
    public function editactivity(Request $request, $id)
    {
        
        $validator = Validator::make($request->all(), [
             'user' => 'required|exists:users,id', 
            'HeroTitle' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'penerbit' => 'required|string|max:255',
            'image' => 'required',
            'subtitle2' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $Activity = Activity::find($id);
        $Activity->update([
            'userID' => $request->user,
            'HeroTitle' => $request->HeroTitle,
            'subtitle' => $request->subtitle,
            'penerbit' => $request->penerbit,
            'HeroIMG' => $request->image,
            'subtitle2' => $request->subtitle2,
        ]);
       // $uploads = [];
   // if ($request->hasFile('heroIMG')) {
        // $originalFileName = pathinfo($request->file('heroIMG')->getClientOriginalName(), PATHINFO_FILENAME);
       // $safeFileName = preg_replace('/[^A-Za-z0-9\-]/', '', $originalFileName);
        // $extension = $request->file('heroIMG')->getClientOriginalExtension();
        //$imageName = $safeFileName . '.' . $extension;

        //$destinationPath = 'public/Activity/image';
        //$request->file('heroIMG')->storeAs($destinationPath, $imageName);

        //$imageUrl = asset('storage/Activity/image') . $imageName;
        //$uploads['heroIMG'] = $imageUrl;
        //}
       // $Activity->update($uploads);
       

        return response()->json([
            'message' => 'Activity Has Been updated Succesfully',
        ], 201);
    }
               /**
     * @OA\Post(
     *     path="/api/deleteactivity/{id}",
     *     tags={"siteactivty"},
     *     summary="API that delete activity data ",
     *     description="it will delete data",
     *     operationId="deleteactivity",
     *     @OA\Response(
     *         response="default",
     *         description="it will request data to delete data from model activity"
     *     )
     * )
     */
    public function deleteactivity(Request $request, $id)
    {
        $activity = Activity::find($id);
        $activity->delete();
        return response()->json([
            'message' => 'Activity has been deleted succesfully',
        ], 201);
    }
            /**
     * @OA\Post(
     *     path="/api/newhotnews",
     *     tags={"siteactivty"},
     *     summary="API that create hotnews ",
     *     description="it will send data to database",
     *     operationId="newhotnews",
     *     @OA\Response(
     *         response="default",
     *         description="send data to model siteactivty"
     *     )
     * )
     */
    public function addhotnews(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
             'user' => 'required|exists:users,id', 
            'HeroTitle' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'image' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }


        $hotnews = Hotnews::create([
            'userID' => $request->user,
            'HeroTitle' => $request->HeroTitle,
            'deskripsi' => $request->deskripsi,
            'HeroIMGp' => $request->image,
        ]);
       // $uploads = [];
   // if ($request->hasFile('heroIMG')) {
        // $originalFileName = pathinfo($request->file('heroIMG')->getClientOriginalName(), PATHINFO_FILENAME);
       // $safeFileName = preg_replace('/[^A-Za-z0-9\-]/', '', $originalFileName);
        // $extension = $request->file('heroIMG')->getClientOriginalExtension();
        //$imageName = $safeFileName . '.' . $extension;

        //$destinationPath = 'public/hotnews/image';
        //$request->file('heroIMG')->storeAs($destinationPath, $imageName);

        //$imageUrl = asset('storage/hotnews/image') . $imageName;
        //$uploads['heroIMG'] = $imageUrl;
        //}
       // $hotnews->update($uploads);
       

        return response()->json([
            'message' => 'Hotnews Has Been added Succesfully',
        ], 201);
    }
               /**
     * @OA\Post(
     *     path="/api/edithotnews/{id}",
     *     tags={"siteactivty"},
     *     summary="API that edit hotnews data ",
     *     description="it will edit data",
     *     operationId="edithotnews",
     *     @OA\Response(
     *         response="default",
     *         description="it will request data to edit from model hotnews"
     *     )
     * )
     */
    public function edithotnews(Request $request, $id)
    {
        
        $validator = Validator::make($request->all(), [
             'user' => 'required|exists:users,id', 
            'HeroTitle' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'image' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $hotnews = Hotnews::find($id);
        $hotnews->update([
            'userID' => $request->user,
            'HeroTitle' => $request->HeroTitle,
            'deskripsi' => $request->deskripsi,
            'HeroIMGp' => $request->image,
        ]);
       // $uploads = [];
   // if ($request->hasFile('heroIMG')) {
        // $originalFileName = pathinfo($request->file('heroIMG')->getClientOriginalName(), PATHINFO_FILENAME);
       // $safeFileName = preg_replace('/[^A-Za-z0-9\-]/', '', $originalFileName);
        // $extension = $request->file('heroIMG')->getClientOriginalExtension();
        //$imageName = $safeFileName . '.' . $extension;

        //$destinationPath = 'public/hotnews/image';
        //$request->file('heroIMG')->storeAs($destinationPath, $imageName);

        //$imageUrl = asset('storage/hotnews/image') . $imageName;
        //$uploads['heroIMG'] = $imageUrl;
        //}
       // $hotnews->update($uploads);
       

        return response()->json([
            'message' => 'Hotnews Has Been updated Succesfully',
        ], 201);
    }
                  /**
     * @OA\Post(
     *     path="/api/deletehotnews/{id}",
     *     tags={"siteactivty"},
     *     summary="API that delete hotnews data ",
     *     description="it will delete data",
     *     operationId="deletehotnews",
     *     @OA\Response(
     *         response="default",
     *         description="it will request data to delete data from model hotnews"
     *     )
     * )
     */
    public function deletehotnews(Request $request, $id)
    {
        $activity = Hotnews::find($id);
        $activity->delete();
        return response()->json([
            'message' => 'hotnews has been deleted succesfully',
        ], 201);
    }

}
