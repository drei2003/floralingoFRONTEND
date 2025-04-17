<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'userId' => 'required|exists:gen_users,id',
            'shippingAdd' => 'required|string',
            'paymentMethod' => 'required|string',
            'deliveryDate' => 'required|date',
            'deliveryTime' => 'required|date_format:H:i',
            'TotalPrice' => 'required|numeric',
            'numItems' => 'required|integer',
            'Name' => 'required|string',
            'orderedProducts' => 'required|string',
        ]);

        // Create a new order instance
        $order = new Order();

        // Assign user ID from the hidden input
        $order->gen_user_id = $request->userId;

        // Generate a unique OrderID
        $order->OrderID = strtoupper(Str::random(4));

        // Set other order details from form data
        $order->paymentMethod = $request->paymentMethod;
        $order->status = 'Pending';
        $order->TotalPrice = $request->TotalPrice;
        $order->Name = $request->Name;
        $order->orderedProducts = $request->orderedProducts;
        $order->deliveryDate = Carbon::parse($request->deliveryDate);
        $order->deliveryTime = $request->deliveryTime;
        $order->shippingAdd = $request->shippingAdd;
        $order->numItems = $request->numItems;

        // Save the order to the database
        $order->save();

        // Delete the items in the cart for the logged-in user (via session)
        $cartItems = Cart::where('gen_user_id', $request->userId)->get();
        foreach ($cartItems as $cartItem) {
            $cartItem->delete();
        }

        // Fetch all orders and convert them to JSON
        $orders = Order::all();
        $ordersArray = $orders->toArray();
        $filePath = resource_path('js/pages/data table/user_orders.json');
        file_put_contents($filePath, json_encode($ordersArray, JSON_PRETTY_PRINT));

        session()->flash('success', 'Your order has been placed successfully!');
        return redirect()->route('checkout'); // or wherever you want to send the user
    }


    // Method to update order status
    public function update(Request $request, $orderId)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'status' => 'required|in:Pending,Packed,Delivered,Cancelled',
        ]);

        // Find the order by OrderID
        $order = Order::where('OrderID', $orderId)->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Update the status of the order
        $order->status = $validated['status'];
        $order->save();

        // Update JSON file
        $orders = Order::all();
        $filePath = resource_path('js/pages/data table/user_orders.json');
        file_put_contents($filePath, json_encode($orders, JSON_PRETTY_PRINT));

        return response()->json(['message' => 'Order status updated'], 200);
    }

    public function destroy($orderId)
    {
        $order = Order::where('OrderID', $orderId)->first();

        if (!$order) {
            return redirect()->back()->with('error', 'Order not found');
        }

        $order->delete();

        // Update JSON file
        $orders = Order::all();
        $filePath = resource_path('js/pages/data table/user_orders.json');
        file_put_contents($filePath, json_encode($orders, JSON_PRETTY_PRINT));

        return redirect()->back()->with('success', 'Order deleted successfully');
    }




}
