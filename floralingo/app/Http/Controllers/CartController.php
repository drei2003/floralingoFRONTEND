<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\PaymentMethod;
use App\Models\Address;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Get the logged-in user from the session
        $user = session('user');

        if (!$user) {
            return redirect()->back()->with('error', 'You must be logged in to add to cart.');
        }

        // Check if the product already exists in the cart for this user
        $existingCartItem = Cart::where('gen_user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingCartItem) {
            // Update quantity
            $existingCartItem->quantity += $request->quantity;
            $existingCartItem->save();
        } else {
            // Create new cart entry
            Cart::create([
                'gen_user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    //add to cart button sa userHome
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        // Get the logged-in user from the session
        $user = session('user');

        if (!$user) {
            return redirect()->back()->with('error', 'You must be logged in to add to cart.');
        }

        // Default quantity is 1 since it's coming from the button click
        $quantity = 1;

        // Check if the product already exists in the cart for this user
        $existingCartItem = Cart::where('gen_user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingCartItem) {
            // Update quantity
            $existingCartItem->quantity += $quantity;
            $existingCartItem->save();
        } else {
            // Create new cart entry
            Cart::create([
                'gen_user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $quantity,
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }


    public function showCart()
    {
        $user = session('user');

        if (!$user) {
            return redirect()->route('login')->with('error', 'You must be logged in to view the cart.');
        }

        $cartItems = Cart::where('gen_user_id', $user->id)
            ->join('products', 'products.id', '=', 'carts.product_id')
            ->select('carts.*', 'products.ProductName as product_name', 'products.Thumbnail_url as Thumbnail_url', 'products.Price as unit_price')
            ->get();

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->unit_price;
        });

        $voucherDiscount = 0;
        $shippingFee = 75;

        $total = $subtotal - $voucherDiscount + $shippingFee;

        return view('cart', compact('cartItems', 'subtotal', 'voucherDiscount', 'shippingFee', 'total'));
    }



    public function removeFromCart($cartItemId)
    {
        $user = session('user');

        if (!$user) {
            return redirect()->route('login')->with('error', 'You must be logged in to remove items from the cart.');
        }

        // Find and delete the cart item
        $cartItem = Cart::where('gen_user_id', $user->id)->where('id', $cartItemId)->first();

        if ($cartItem) {
            $cartItem->delete();
        }

        return redirect()->back()->with('success', 'Item removed from cart.');
    }

    public function updateQuantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem = Cart::findOrFail($id);
        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return redirect()->back()->with('success', 'Quantity updated successfully!');
    }

    //for checkout
    public function checkOutPage()
    {
        $user = session('user');

        if (!$user) {
            return redirect()->route('login')->with('error', 'You must be logged in to checkout.');
        }

        // Get all cart items of the user
        $cartItems = Cart::where('gen_user_id', $user->id)
            ->join('products', 'products.id', '=', 'carts.product_id')
            ->select('carts.*', 'products.ProductName as product_name', 'products.Thumbnail_url as thumbnail', 'products.Price as unit_price')
            ->get();

        // Calculate order summary
        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->unit_price;
        });

        $totalItems = $cartItems->sum('quantity');
        $voucherDiscount = 0; // optional
        $shippingFee = 75;
        $total = $subtotal - $voucherDiscount + $shippingFee;

        // Fetch active payment methods from DB
        $paymentMethods = PaymentMethod::where('status', 'Active')->get();

        // Fetch user addresses
        $addresses = Address::where('user_id', $user->id)->get();

        if ($addresses->isEmpty()) {
            return redirect()->route('profile')->with('error', 'You must add an address before proceeding to checkout.');
        }
        return view('checkout', compact('cartItems', 'subtotal', 'totalItems', 'voucherDiscount', 'shippingFee', 'total', 'paymentMethods', 'addresses'));
    }




}
