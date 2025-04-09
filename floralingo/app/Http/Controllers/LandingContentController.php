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
            ->limit(3)
            ->get();

        // Pass both products and flowers data to the view
        return view('userlanding', compact('products', 'flowers'));
    }

    public function userHomeContent()
    {
        // Fetch top 5 new products ordered by 'Added_at' in descending order
        $newProducts = Product::select('ProductName', 'Price', 'Thumbnail_url', 'id')
            ->where('Availability', 'Available')
            ->where('Category', '!=', 'Unavailable')
            ->orderBy('Added_at', 'desc') // Order by Added_at, descending
            ->take(5) // Limit to 5 new products
            ->get();
    
        // Fetch top 5 Best Sellers
        $bestSellers = Product::select('ProductName', 'Price', 'Thumbnail_url', 'Description', 'id')
            ->where('Availability', 'Available')
            ->where('Category', 'Best Sellers')
            ->take(5) // Limit to 5 best sellers
            ->get();


        $allProducts = Product::select('ProductName', 'Price', 'Thumbnail_url', 'Description', 'id')
            ->where('Availability', 'Available')
            ->where('Category', '!=', 'Unavailable')
            ->get();

        $dictionary = Flower::orderBy('added_at', 'desc')->take(3)->get();

        return view('userHome', compact('newProducts', 'bestSellers', 'allProducts', 'dictionary'));
    }
    
    
}

