<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Carbon;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch latest product categories
        $categories = ProductCategory::latest()->get(['id', 'ProductCatID', 'Name', 'Description', 'addedAt']);

        // Format data
        $formattedCategories = $categories->map(function ($category) {
            return [
                'id' => (int) $category->id,
                'ProductCatID' => (int) $category->ProductCatID,
                'Name' => (string) $category->Name,
                'Description' => (string) $category->Description ?? '',
                'addedAt' => Carbon::parse($category->addedAt)->format('m-d-Y'),
            ];
        });

        // Define the path where JSON should be saved
        $jsonFilePath = base_path('resources/js/pages/data table/data-category.json');

        // Ensure the directory exists
        if (!File::exists(dirname($jsonFilePath))) {
            File::makeDirectory(dirname($jsonFilePath), 0755, true, true);
        }

        // Save data to the JSON file
        File::put($jsonFilePath, json_encode($formattedCategories, JSON_PRETTY_PRINT));

        // Return an Inertia response to render the category page
        return Inertia::render('category', [
            'categories' => $formattedCategories
        ]);
    }


    public function create()
    {
        
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ProductCatID' => 'required|unique:product_categories|integer',
            'Name' => 'required|string|max:255',
            'Description' => 'required|string',
            'addedAt' => 'nullable|date',
        ]);

        ProductCategory::create($validated);

        return redirect()->route('category.index')->with('success', 'Product category created successfully!');
    }


    public function show($id):JsonResponse
    {
        $productCategory = ProductCategory::find($id);
        if (!$productCategory) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($productCategory);
    }

    public function edit()
    {
        
    }

    public function update(Request $request, $id)
    {
        $category = ProductCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Validate request
        $request->validate([
            'Name' => 'required|string|max:255',
            'Description' => 'required|string|max:500',
        ]);

        // Update category
        $category->Name = $request->Name;
        $category->Description = $request->Description;
        $category->save();

        return response()->json(['message' => 'Product Category updated successfully!']);
    }

    public function destroy($id): JsonResponse
    {
        $category = ProductCategory::find($id);
    
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        $category->delete();
    
        return response()->json(['message' => 'Product Category deleted successfully!']);
    }
}
