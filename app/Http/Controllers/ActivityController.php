<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Activity;
use App\Models\Hotnews;
use App\Models\Disctrict;

class ActivityController extends Controller
{
    public function datauser()
    {
        $users = User::where('role', 'district_admin')->get();
        return response()->json([
            'data' => $users
        ]);
    }

    public function activitydata()
    {
        $data = Activity::all();
        return response()->json([
            'data' => $data
        ]);
    }

    public function datahotnews()
    {
        $data = Hotnews::all();
        return response()->json([
            'data' => $data
        ]);
    }

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

    public function deleteactivity(Request $request, $id)
    {
        $activity = Activity::find($id);
        $activity->delete();
        return response()->json([
            'message' => 'Activity has been deleted succesfully',
        ], 201);
    }

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

    public function deletehotnews(Request $request, $id)
    {
        $activity = Hotnews::find($id);
        $activity->delete();
        return response()->json([
            'message' => 'hotnews has been deleted succesfully',
        ], 201);
    }

}
