<?php

namespace App\Http\Controllers;

use App\Models\Flower;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Carbon;
use Illuminate\Http\JsonResponse;

class FlowerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $flowers = Flower::orderBy('added_at', 'desc')->get(['id', 'flower_id', 'flower_name', 'description', 'scientific_name', 'pronunciation', 'added_at', 'Thumbnail_url']);


        // Format data
        $formattedFlowers = $flowers->map(function ($flowers) {
            return [
                'id' => (int) $flowers->id,
                'flower_id' => (string) $flowers->flower_id,
                'flower_name' => (string) $flowers->flower_name,
                'description' => (string) $flowers->description,
                'scientific_name' => (string) $flowers->scientific_name,
                'pronunciation' => (string) $flowers->pronunciation,
                'added_at' => Carbon::parse($flowers->added_at)->format('m-d-Y'),
                'Thumbnail_url' => $flowers->Thumbnail_url ? asset('imgAssets/' . basename($flowers->Thumbnail_url)) : null,
            ];
        });

        // Define the path where JSON should be saved
        $jsonFilePath = base_path('resources/js/pages/data table/data-flower.json');

        // Ensure the directory exists
        if (!File::exists(dirname($jsonFilePath))) {
            File::makeDirectory(dirname($jsonFilePath), 0755, true, true);
        }

        // Save data to the JSON file
        File::put($jsonFilePath, json_encode($formattedFlowers, JSON_PRETTY_PRINT));

        // Return an Inertia response to render the category page
        return Inertia::render('flowers', [
            'flowers' => $formattedFlowers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'flower_id' => 'required|integer|unique:flowers,flower_id',
            'flower_name' => 'required|string|max:255',
            'description' => 'required|string',
            'scientific_name' => 'required|string|max:255',
            'pronunciation' => 'required|string|max:255',
            'added_at' => 'nullable|date',
            'Thumbnail_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        // Handle image upload
        if ($request->hasFile('Thumbnail_url')) {
            $file = $request->file('Thumbnail_url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $filePath = 'imgAssets/' . $filename;
            
            // Move file to the public path
            $file->move(public_path('imgAssets'), $filename);
            
            // Set the correct URL
            $validated['Thumbnail_url'] = $filePath;
        }

        // Save the flower data
        Flower::create($validated);

        return redirect()->route('flowers.index')->with('success', 'Flower created successfully!');
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $flower = Flower::find($id);
    
        if (!$flower) {
            return response()->json(['message' => 'Flower not found'], 404);
        }
    
        // Validate request
        $request->validate([
            'flower_name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'scientific_name' => 'required|string|max:255',
            'pronunciation' => 'required|string|max:255',
            'added_at' => 'required|date',
        ]);
    
        // Update flower details
        $flower->flower_name = $request->flower_name;
        $flower->description = $request->description;
        $flower->scientific_name = $request->scientific_name;
        $flower->pronunciation = $request->pronunciation;
        $flower->added_at = $request->added_at;
        $flower->save();
    
        return response()->json(['message' => 'Flower updated successfully!']);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Flower::find($id);
    
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        $category->delete();
    
        return response()->json(['message' => 'Product Category deleted successfully!']);
    }
}

