<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PaymenthMethodController;
use App\Http\Controllers\CategoryController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\FlowerController;
use App\Http\Controllers\LandingContentController;


Route::get('/userLogIn', function () {
    return view('userLogIn');
})->name('userLogIn');

Route::get('/userSignUp', function () {
    return view('userSignUp');
})->name('userSignUp');

Route::get('/forgotPass', function () {
    return view('forgotPass');
})->name('forgotPass');

Route::get('/userHome', function () {
    return view('userHome');
})->name('userHome');




//Public Routes (Accessible to Everyone)
//landing page new BLADE
Route::get('/', [LandingContentController::class, 'landingPage'])->name('userlanding');

//render admin login page
Route::get('/admin', function () {
    return Inertia::render('auth/login');
})->name('home');


//old landing page
Route::get('/landingPage', function () {
    return Inertia::render('landingPage');
})->name('landingPage');

Route::get('/userlanding', function () {
    return view('userlanding');
})->name('userlanding');


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
