"use strict";
const User = use("App/Models/User");
const { validateAll } = use("Validator");

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
        username: "required|max:255|unique:users",
        email: "required|email|max:255|unique:users",
        location: "required|max:255",
        url: "required|max:255",
        bio: "required|max:255",
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
      return response.redirect("/login");
    } catch (error) {
      console.log(error);
      session.flash({ error: "Invalid Login Credentials" });
      return response.status(500).json({
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
      const userInfo = request.all();

      const rules = {
        email: "required",
        password: "required",
      };
      const validation = await validateAll(userInfo, rules);
      if (validation.fails()) {
        session.withErrors(validation.messages()).flashExcept(["password"]);

        return response.redirect("back");
      }
      await auth.attempt(userInfo);

      response.status(200).json({
        status: "Login successfully",
      });
      return response.redirect("/account/profile");
    } catch (error) {
      console.log(error);
      session.flash({ error: "Invalid Login Credentials" });
      // response.status(500).json({
      //   message: "Invalid Login Credentials",
      //   error,
      // });
      return response.redirect("/");
    }
  }

  async logout({ auth, response }) {
    console.log("Hi");
    await auth.logout();

    response.redirect("/");
  }
}

module.exports = UserController;
