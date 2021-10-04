import Knex from "knex"
import knexfile from "../../knexfile"

let client

export default function getClient() {
  if (!client) {
    const config = knexfile[process.env.ENVIRONMENT]
    console.log(config)
    client = Knex(config)
  }

  return client
}