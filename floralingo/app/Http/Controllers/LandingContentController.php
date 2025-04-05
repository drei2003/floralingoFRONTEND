<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Flower;
use Illuminate\Http\Request;

class LandingContentController extends Controller
{
    // Accessing both products and flowers from the database
    // and displaying them on the landing page
    public function landingPage()
    {
        // Fetch products (limit 8 products)
        $products = Product::select('ProductName', 'Price', 'Thumbnail_url', 'id')
            ->where('Availability', 'Available')
            ->where('Category', '!=', 'Unavailable')
            ->take(8) // limit 8 products
            ->get();

        // Fetch 2 flowers
        $flowers = Flower::select('Thumbnail_url', 'flower_name', 'description', 'scientific_name', 'pronunciation')
            ->limit(2)
            ->get();

        // Pass both products and flowers data to the view
        return view('userlanding', compact('products', 'flowers'));
    }
}

