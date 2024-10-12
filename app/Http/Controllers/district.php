<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Disctrict;
use App\Models\User;
use App\Models\Highlight;


class district extends Controller
{
    public function datauser()
    {
        $users = User::where('role', 'site_admin')->get();
        return response()->json([
            'data' => $users
        ]);
    }

    public function districtdata()
    {
        $data = Disctrict::all();
        return response()->json([
            'data' => $data
        ]);
    }

    public function searchdistrict(Request $request)
    {
        $search = $request->input('search');

    $users = User::where('role', 'district_admin')
        ->orWhere('username', 'like', '%' . $search . '%')
        ->get();
        return response()->json([
            'data' => $users
        ]);
    }

    public function adddistrict(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
             'user' => 'required|exists:users,id', 
             'highlight' => 'required|exists:highlights,id',
            'disctrictName' => 'required|string|max:255',
            'disctrictDescription' => 'required|string',
            'location' => 'required',
            'image' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }


        $district = Disctrict::create([
            'userID' => $request->user,
            'highlightID' => $request->highlight,
            'disctrictName' => $request->disctrictName,
            'disctrictDescription' => $request->disctrictDescription,
            'location' => $request->location,
            'heroIMG' => $request->image,
        ]);
       // $uploads = [];
   // if ($request->hasFile('heroIMG')) {
        // $originalFileName = pathinfo($request->file('heroIMG')->getClientOriginalName(), PATHINFO_FILENAME);
       // $safeFileName = preg_replace('/[^A-Za-z0-9\-]/', '', $originalFileName);
        // $extension = $request->file('heroIMG')->getClientOriginalExtension();
        //$imageName = $safeFileName . '.' . $extension;

        //$destinationPath = 'public/district/image';
        //$request->file('heroIMG')->storeAs($destinationPath, $imageName);

        //$imageUrl = asset('storage/district/image') . $imageName;
        //$uploads['heroIMG'] = $imageUrl;
        //}
       // $district->update($uploads);
       

        return response()->json([
            'message' => 'District Has Been added Succesfully',
        ], 201);
    }

    public function addDestination(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'disctrictName' => 'required|string|max:255',
            'disctrictDescription' => 'required|string',
            'location' => 'required',
            'image' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }


        $district = Highlight::create([
            'highlightIMG' => $request->image,
            'highlightTitle' => $request->disctrictName,
            'highlightDescription' => $request->disctrictDescription,
            'location' => $request->location,
        ]);
       // $uploads = [];
   // if ($request->hasFile('heroIMG')) {
        // $originalFileName = pathinfo($request->file('heroIMG')->getClientOriginalName(), PATHINFO_FILENAME);
       // $safeFileName = preg_replace('/[^A-Za-z0-9\-]/', '', $originalFileName);
        // $extension = $request->file('heroIMG')->getClientOriginalExtension();
        //$imageName = $safeFileName . '.' . $extension;

        //$destinationPath = 'public/district/image';
        //$request->file('heroIMG')->storeAs($destinationPath, $imageName);

        //$imageUrl = asset('storage/district/image') . $imageName;
        //$uploads['heroIMG'] = $imageUrl;
        //}
       // $district->update($uploads);
       

        return response()->json([
            'message' => 'Destination has been added succesfully',
        ], 201);
    }

    public function editDestination(Request $request, $id)
    {
        
        $validator = Validator::make($request->all(), [
            'disctrictName' => 'required|string|max:255',
            'disctrictDescription' => 'required|string',
            'location' => 'required',
            'image' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $destination = Highlight::find($id);
        $destination->update([
            'highlightIMG' => $request->image,
            'highlightTitle' => $request->disctrictName,
            'highlightDescription' => $request->disctrictDescription,
            'location' => $request->location,
        ]);
       // $uploads = [];
   // if ($request->hasFile('heroIMG')) {
        // $originalFileName = pathinfo($request->file('heroIMG')->getClientOriginalName(), PATHINFO_FILENAME);
       // $safeFileName = preg_replace('/[^A-Za-z0-9\-]/', '', $originalFileName);
        // $extension = $request->file('heroIMG')->getClientOriginalExtension();
        //$imageName = $safeFileName . '.' . $extension;

        //$destinationPath = 'public/district/image';
        //$request->file('heroIMG')->storeAs($destinationPath, $imageName);

        //$imageUrl = asset('storage/district/image') . $imageName;
        //$uploads['heroIMG'] = $imageUrl;
        //}
       // $district->update($uploads);
       

        return response()->json([
            'message' => 'Destination has been edit succesfully',
        ], 201);
    }

    public function addfaq(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'question' => 'required',
            'answer' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }


        $district = Highlight::create([
            'question' => $request->question,
            'answer' => $request->answer,
        ]);

        return response()->json([
            'message' => 'FAQ has been added succesfully',
        ], 201);
    }

    public function editfaq(Request $request, $id)
    {
        
        $validator = Validator::make($request->all(), [
            'question' => 'required',
            'answer' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }


        $faq = Highlight::find($id);
        $faq->update([
            'question' => $request->question,
            'answer' => $request->answer,
        ]);

        return response()->json([
            'message' => 'FAQ has been edit succesfully',
        ], 201);
    }

    public function deletefaq(Request $request, $id)
    {
        $faq = Highlight::find($id);
        $faq->delete();
        return response()->json([
            'message' => 'FAQ has been deleted succesfully',
        ], 201);
    }

    

    
}
