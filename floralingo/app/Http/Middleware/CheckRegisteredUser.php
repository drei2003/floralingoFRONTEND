<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\GenUser;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class CheckRegisteredUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is logged in by checking session or any other method you use for authentication
        $user = Session::get('user'); // Assuming you're using session to store logged-in user info
        
        if ($user) {
            // Check if the user is registered in the database
            $registeredUser = GenUser::find($user->id);

            if ($registeredUser) {
                // User is logged in and registered, allow access
                return $next($request);
            }
        }

        // If user is not logged in or not registered, redirect to login page
        return redirect()->route('userLogIn')->with('error', 'You must be logged in and registered to access this page.');
    }
}
