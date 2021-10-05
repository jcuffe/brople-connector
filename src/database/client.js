import { Model, knexSnakeCaseMappers } from "objection"
import Knex from "knex"
import knexfile from "../../knexfile"

export default function withTransaction(handlerFactory) {
  return async function handleRequest(...handlerArgs) {
    // Merge column mapping into config
    const knexConfig = {
      ...knexfile[process.env.ENVIRONMENT],
      ...knexSnakeCaseMappers(),
    }

    // Prepare the database connection
    const knex = Knex(knexConfig)
    Model.knex(knex)

    // Wrap request handler logic in a transaction
    const requestHandler = handlerFactory(...handlerArgs)
    return Model.transaction(requestHandler)
      .catch((err) => console.log(err))
      .finally(() => knex.destroy())
  }
}
