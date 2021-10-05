import { Model } from 'objection'

class Session extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'sessions';
  }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: ['string', 'null'] },
        email: { type: ['string', 'null'] },
        currency: { type: 'string' },
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
  }
}

export default Session