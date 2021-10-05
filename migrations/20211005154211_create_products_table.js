exports.up = function (knex) {
  return knex.schema.hasTable("products").then(function (exists) {
    if (exists) return
    return knex.schema.createTable("products", (table) => {
      table.increments("id")
      table.string("name").notNullable()
      table.integer("price").notNullable()
      table.decimal("rating", 2, 1).notNullable()
      table.string("thumbnail").notNullable()
      table.string("description").notNullable()
      table.string("specs").notNullable()
    })
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products")
}
