"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "HomeController.index").as("welcomePage");

Route.get("/register", "UserController.showCreateUser");
Route.post("/register", "UserController.createUser").as("register.index");

Route.get("/login", "UserController.showLoginUser");
Route.post("/login", "UserController.loginUser");

Route.group(() => {
  Route.get("/profile", "AccountController.showProfile");
  // Route.post("/", "UserController.createUser");
}).prefix("/account");
