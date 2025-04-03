<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PaymenthMethodController;
use App\Http\Controllers\CategoryController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\FlowerController;


//Public Routes (Accessible to Everyone)
Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::get('/landingPage', function () {
    return Inertia::render('landingPage');
})->name('landingPage');




Route::get('/landing', function () {
    return view('landing');
});





//User Routes (Only for Logged-In Users, Excluding Admins)
Route::middleware(['auth', 'verified'])->group(function () {
    //for authenticated users
});


//Admin Routes (Only Admins Can Access)
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/orders', function () {
        return Inertia::render('orders');
    })->name('orders');



    Route::get('/sales', function () {
        return Inertia::render('sales');
    })->name('sales');

    Route::resource('products', ProductController::class);

    Route::resource('flowers', FlowerController::class);

    Route::resource('category', CategoryController::class);
    
    Route::resource('paymentOptions', PaymenthMethodController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
