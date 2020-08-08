"use strict";

class AccountController {
  async showProfile({ view }) {
    return view.render("account.profile");
  }
}

module.exports = AccountController;
