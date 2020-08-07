"use strict";
const User = use("App/Models/User");

class UserController {
  async showCreateUser({ view }) {
    return view.render("auth.register");
  }

  async createUser({ request, session, response }) {
    try {
      const userInfo = request.only([
        "name",
        "username",
        "email",
        "location",
        "url",
        "bio",
        "password",
      ]);
      const rules = {
        name: "required|max:255",
        username: "required|max:255",
        email: "required|email|max:255|unique:users",
        location: "required|email|max:255|unique:users",
        url: "required|email|max:255|unique:users",
        bio: "required|email|max:255|unique:users",
        password: "required|min:6|max:30",
      };

      const validation = await validateAll(userInfo, rules);

      if (validation.fails()) {
        session.withErrors(validation.messages()).flashExcept(["password"]);

        return response.redirect("back");
      }

      const user = await User.create(userInfo);
      if (!user) throw new Error();

      response.status(201).json({
        status: "Registered successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        message: "Account not created",
        error,
      });
    }
  }

  async showLoginUser({ view }) {
    return view.render("auth.login");
  }

  async loginUser({ request, session, auth, response }) {
    try {
      const userInfo = request.only(["email", "password"]);

      const rules = {
        email: "required",
        password: "required",
      };

      const validation = await validateAll(userInfo, rules);

      if (validation.fails()) {
        session.withErrors(validation.messages()).flashExcept(["password"]);

        return response.redirect("back");
      }
      await auth.attempt(email, password);
      return response.redirect("home");
    } catch (error) {
      session.flash({ error: "Invalid Login Credentials" });
      return response.redirect("back");
    }
  }
}

module.exports = UserController;
