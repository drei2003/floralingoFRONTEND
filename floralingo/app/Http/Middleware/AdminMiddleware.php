<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // List of hardcoded admin emails (Modify as needed)
        $adminEmails = ['janine@gmail.com','admin@gmail.com']; // Add more admin emails if necessary

        if (!Auth::check()) {
            // If not logged in, redirect to login page
            return redirect()->route('/home');
        }

        if (!in_array(Auth::user()->email, $adminEmails)) {
            // If user is not an admin, redirect to "Not Authorized" page
            return redirect()->route('landingPage')->with('error', 'You are not authorized to access this page.');
        }

        // If admin, proceed to the requested page
        return $next($request);
    }
}
