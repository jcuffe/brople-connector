exports.up = function (knex) {
  return knex.schema.hasTable("images").then(function (exists) {
    if (exists) return
    return knex.schema.createTable("images", (table) => {
      table.increments("id")
      table.string("src").notNullable()
      table.string("alt").notNullable()
      table.integer("height").notNullable()
      table.integer("width").notNullable()
      table.integer("carousel_order").notNullable()
      table.boolean("thumbnail").notNullable()
      table
        .integer("product_id")
        .references("id")
        .inTable("products")
        .notNullable()
    })
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("images")
}
