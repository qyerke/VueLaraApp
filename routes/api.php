<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('user', 'v1\UserController');auth('api')->user();
Route::get('profile', 'v1\UserController@profile');
Route::put('profile', 'v1\UserController@updateInfo');
Route::get('getprofile', function() {
	return auth('api')->user();
});