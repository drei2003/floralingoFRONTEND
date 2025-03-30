<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Carbon;
use App\Models\PaymentMethod;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class PaymenthMethodController extends Controller
{
    public function index()
    {
        // Fetch latest product categories
        $payment = PaymentMethod::latest()->get(['id', 'PaymentID', 'paymentMethod', 'status']);

        // Format data
        $formattedPayment = $payment->map(function ($payment) {
            return [
                'id' => (int) $payment->id,
                'PaymentID' => (string) $payment->PaymentID,
                'paymentMethod' => (string) $payment->paymentMethod,
                'status' => (string) $payment->status,
            ];
        });

        // Define the path where JSON should be saved
        $jsonFilePath = base_path('resources/js/pages/data table/data-payment.json');

        // Ensure the directory exists
        if (!File::exists(dirname($jsonFilePath))) {
            File::makeDirectory(dirname($jsonFilePath), 0755, true, true);
        }

        // Save data to the JSON file
        File::put($jsonFilePath, json_encode($formattedPayment, JSON_PRETTY_PRINT));

        // Return an Inertia response to render the category page
        return Inertia::render('paymentOptions', [
            'payment' => $formattedPayment
        ]);
    }
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'PaymentID' => 'required|string|unique:payment_method,PaymentID', // Ensure correct table name
            'paymentMethod' => 'required|string|max:255',
            'status' => 'required|string|in:Active,Disabled',
        ]);
    
        // Store the new payment method
        PaymentMethod::create($validated);
    
        return redirect()->route('paymentOptions.index')->with('success', 'Payment Method created successfully!');
    }
    

    public function show($id):JsonResponse
    {
        $payment = PaymentMethod::find($id);
        if (!$payment) {
            return response()->json(['message' => 'Payment Method not found'], 404);
        }
        return response()->json($payment);
    }

    public function update(Request $request, $PaymentID)
    {
        // Find payment method by PaymentID instead of id
        $paymentMethod = PaymentMethod::where('PaymentID', $PaymentID)->first();
    
        if (!$paymentMethod) {
            return response()->json(['message' => 'Payment method not found'], 404);
        }
    
        // Validate request data
        $validatedData = $request->validate([
            'paymentMethod' => 'required|string|max:255',
            'status' => 'required|string|in:Active,Disabled',
        ]);
    
        // Update the payment method
        $paymentMethod->update($validatedData);
    
        return response()->json(['message' => 'Payment method updated successfully!']);
    }

    public function destroy($id): JsonResponse
    {
        $payment = PaymentMethod::find($id);
    
        if (!$payment) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        $payment->delete();
    
        return response()->json(['message' => 'Product Category deleted successfully!']);
    }
    
    
    
    
}
