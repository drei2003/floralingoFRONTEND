<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/orders', function () {
    return Inertia::render('orders');
})->name('orders');

Route::get('/products', function () {
    return Inertia::render('products');
})->name('products');

Route::get('/category', function () {
    return Inertia::render('category');
})->name('category');

Route::get('/flowers', function () {
    return Inertia::render('flowers');
})->name('flowers');

Route::get('/paymentOptions', function () {
    return Inertia::render('paymentOptions');
})->name('paymentOptions');

Route::get('/sales', function () {
    return Inertia::render('sales');
})->name('sales');

Route::get('/landingPage', function () {
    return Inertia::render('landingPage');
})->name('landingPage');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
