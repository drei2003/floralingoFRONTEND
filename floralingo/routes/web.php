<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PaymenthMethodController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GenUserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\FlowerController;
use App\Http\Controllers\LandingContentController;
use App\Http\Middleware\CheckRegisteredUser;


//Public Routes (Accessible to Everyone)
//landing page new BLADE
Route::get('/', [LandingContentController::class, 'landingPage'])->name('userlanding'); 



Route::get('/dictionary', function () {
    return view('dictionary');
})->name('dictionary');

Route::get('/contactUs', function () {
    return view('contactUs');
})->name('contactUs');

Route::get('/faqs', function () {
    return view('faqs');
})->name('faqs');

Route::get('/favorites', function () {
    return view('favorites');
})->name('favorites');

Route::get('/cart', function () {
    return view('cart');
})->name('cart');

Route::get('/profile', function () {
    return view('profile');
})->name('profile');

Route::get('/checkOut', function () {
    return view('checkOut');
})->name('checkOut');

Route::get('/productView', function () {
    return view('productView');
})->name('productView');



Route::get('/userSignUp', function () {
    return view('userSignUp');
})->name('userSignUp');
Route::post('/userSignUp', [GenUserController::class, 'genUserRegister'])->name('userSignUp');

Route::get('/userLogIn', function () {
    return view('userLogIn');
})->name('userLogIn');
Route::post('/userLogIn', [GenUserController::class, 'genUserLogin'])->name('loginUser');


Route::post('/GenLogout', [GenUserController::class, 'GenLogout'])->name('GenLogout');


Route::get('/forgotPass', function () {
    return view('forgotPass');
})->name('forgotPass');

Route::get('/updatePass', function () {
    return view('updatePass');
})->name('updatePass');

// Route to handle the form submission (POST request)
Route::post('/forgotPass', [GenUserController::class, 'resetPassword'])->name('resetPassword');
// Route to update the password (POST request)
Route::post('/updatePass/{id}', [GenUserController::class, 'updatePassword'])->name('updatePassword');

Route::get('/userHome', [LandingContentController::class, 'userHomeContent'])
    ->middleware(CheckRegisteredUser::class)  // Apply custom middleware
    ->name('userHome');




//old landing page
Route::get('/landingPage', function () {
    return Inertia::render('landingPage');
})->name('landingPage');



//User Routes (Only for Logged-In Users, Excluding Admins)
Route::middleware(['auth', 'verified'])->group(function () {
    //for authenticated users
});



//render admin login page
Route::get('/admin', function () {
    return Inertia::render('auth/login');
})->name('home');

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
