<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\GenUser;

class GenUserController extends Controller
{
    public function genUserRegister(Request $request)
{
    // Validate user input
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:gen_users,email',
        'password' => 'required|string|min:8|confirmed',
    ], [
        'email.unique' => 'This email is already taken. Please use a different email address.',
    ]);

    try {
        // Create the user
        $user = GenUser::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Optionally log the user in
        // Auth::login($user);

        // Redirect to the login page with a success message
        return redirect()->route('userLogIn')->with('success', 'Account created successfully! Please log in.');
    } catch (\Exception $e) {
        // Catch any errors and display a friendly error message
        return back()->withErrors(['email' => 'An error occurred while creating your account. Please try again.'])->withInput();
    }
}

    

    public function genUserLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Find the user in the gen_users table
        $user = GenUser::where('email', $credentials['email'])->first();

        // Check if user exists and password matches
        if ($user && Hash::check($credentials['password'], $user->password)) {
            // Log the user in manually
            Auth::login($user);
            
            // Store the user in session
            session(['user' => $user]); // Store the user object in session
    
            $request->session()->regenerate();
    
            return redirect()->route('userHome')->with('success', 'Logged in successfully!');
        }
    
        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ])->withInput();
    }
    

    public function GenLogout(Request $request)
{
    // Remove the custom user session
    $request->session()->forget('user');

    // Optional: destroy the entire session
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    // Redirect to user landing page with success message
    return redirect()->route('userlanding')->with('success', 'Logged out successfully!');

}


}
