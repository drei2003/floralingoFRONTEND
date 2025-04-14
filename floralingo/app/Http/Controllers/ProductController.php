<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Carbon\Carbon;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch products from the database
        $products = Product::orderBy('Added_at', 'desc')->get([
            'id', 'ProductID', 'Price', 'ProductName', 'Added_at', 'Description', 'Thumbnail_url', 'Availability', 'Category'
        ]);

        // Return empty if no products found
        if ($products->isEmpty()) {
            return Inertia::render('products', [
                'products' => []
            ]);
        }

        // Format data
        $formattedProducts = $products->map(function ($product) {
            return [
                'id' => (int) $product->id,
                'ProductID' => (int) $product->ProductID,
                'Price' => (float) $product->Price,
                'ProductName' => (string) $product->ProductName,
                'Description' => (string) $product->Description,
                'Availability' => (string) $product->Availability,
                'Category' => (string) $product->Category,
                'Added_at' => Carbon::parse($product->Added_at)->format('m-d-Y'),
                'Thumbnail_url' => $product->Thumbnail_url ? asset('imgAssets/' . basename($product->Thumbnail_url)) : null,
            ];
        });

        // Define the path where JSON should be saved
        $jsonFilePath = base_path('resources/js/pages/data table/data-products.json');

        // Ensure the directory exists
        if (!File::exists(dirname($jsonFilePath))) {
            File::makeDirectory(dirname($jsonFilePath), 0755, true, true);
        }

        // Save data to the JSON file
        File::put($jsonFilePath, json_encode($formattedProducts, JSON_PRETTY_PRINT));

        // Return an Inertia response to render the products page
        return Inertia::render('products', [
            'products' => $formattedProducts
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
     */public function store(Request $request)
    {
        $validated = $request->validate([
            'ProductID' => 'required|integer|unique:products',
            'ProductName' => 'required|string|max:255',
            'Description' => 'nullable|string',
            'Price' => 'required|numeric',
            'Added_at' => 'nullable|date',
            'Availability' => 'required|string',
            'Category' => 'required|string',
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
        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
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
        // Find the product
        $product = Product::find($id);
    
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        // Validate request
        $request->validate([
            'ProductName' => 'required|string|max:255',
            'Description' => 'nullable|string|max:500',
            'Price' => 'required|numeric',
            'Added_at' => 'nullable|date',
            'Availability' => 'required|string',
            'Category' => 'required|string',
        ]);
    
        // Update product details
        $product->ProductName = $request->ProductName;
        $product->Description = $request->Description;
        $product->Price = $request->Price;
        $product->Added_at = $request->Added_at;
        $product->Availability = $request->Availability;
        $product->Category = $request->Category;
        $product->save();
    
        return response()->json(['message' => 'Product updated successfully!']);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Product::find($id);
    
        if (!$category) {
            return response()->json(['message' => 'Products not found'], 404);
        }
    
        $category->delete();
    
        return response()->json(['message' => 'Product deleted successfully!']);
    }

    //for productView
    public function viewProduct($id)
    {
        $product = Product::findOrFail($id);

        $allProducts = Product::select('ProductName', 'Price', 'Thumbnail_url', 'Description', 'id')
            ->where('Availability', 'Available')
            ->where('Category', '!=', 'Unavailable')
            ->get();

        return view('productView', compact('product', 'allProducts'));
    }
    

}
