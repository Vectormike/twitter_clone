"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TweetSchema extends Schema {
  up() {
    this.create("tweets", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("body", 280).notNullable();
      table.integer("likes");

      table.timestamps();
    });
  }

  down() {
    this.drop("tweets");
  }
}

module.exports = TweetSchema;
