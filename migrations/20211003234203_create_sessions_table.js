
exports.up = function (knex) {
  return knex.schema.hasTable("sessions").then(function (exists) {
    if (exists) return
    return knex.schema.createTable("sessions", table => {
      table.increments()
      table.string("name")
      table.string("email")
      table.string("currency").defaultTo("USD")
    })
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sessions")
};
