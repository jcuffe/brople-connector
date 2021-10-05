import { Model } from "objection"

class Image extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "images"
  }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        src: { type: "string" },
        alt: { type: "string" },
        height: { type: "integer" },
        width: { type: "integer" },
        carouselOrder: { type: "integer" },
        thumbnail: { type: "boolean" },
        productId: { type: "integer" },
      },
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    import Product from "./product"
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: this.ref("productId"),
          to: Product.ref("id"),
        },
      },
    }
  }
}

export default Image
