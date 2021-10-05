import { getProducts } from "./utils/cartStore"
import Session from "./database/models/session"
import withTransaction from "./database/client"

function sessionHandlerFactory(req, res) {
  return async function sessionHandler(trx) {
    const session = await Session.query(trx).first()
    return {
      name: session.name,
      email: session.email,
      cart: {
        items: getProducts(req, res),
      },
      currency: session.currency,
    }
  }
}

export default withTransaction(sessionHandlerFactory)
