import { getProducts } from './utils/cartStore'
import getClient from "./database/client"

export default async function session(req, res) {
  const client = getClient()
  const session = await client("sessions").select("*").first()
  return {
    name: session.name,
    email: session.email,
    cart: {
      items: getProducts(req, res),
    },
    currency: session.currency,
  }
}
