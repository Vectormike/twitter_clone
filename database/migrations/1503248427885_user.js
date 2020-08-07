"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsersSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("name", 255).notNullable();
      table.string("username", 255).notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("location").notNullable();
      table.string("url").notNullable();
      table.string("bio").notNullable();
      table.string("password").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UsersSchema;
