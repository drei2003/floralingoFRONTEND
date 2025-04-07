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
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create the user
        $user = GenUser::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Log the user in
        Auth::login($user);

        // Redirect to the home page
        return redirect()->route('userHome')->with('success', 'Account created successfully!');
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

            $request->session()->regenerate();

            return redirect()->route('userHome')->with('success', 'Logged in successfully!');
        }

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ])->withInput();
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('userlanding')->with('success', 'Logged out successfully!');
    }


}
