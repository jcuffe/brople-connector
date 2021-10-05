import fulfillAPIRequest from "react-storefront/props/fulfillAPIRequest"
import getBase64ForImage from "react-storefront/utils/getBase64ForImage"
import createAppData from "./utils/createAppData"
import Product from "./database/models/product"
import withTransaction from "./database/client"

function productHandlerFactory(params, req) {
  return async function productHandler(trx) {
    const product = await Product.query(trx)
      .findById(params.id)
      .withGraphFetched("images")
    async function pageData() {
      return {
        title: `Product ${params.id}`,
        product,
        breadcrumbs: [
          {
            text: "Home",
            href: "/",
          },
          {
            text: `Subcategory ${params.id}`,
            as: `/s/${params.id}`,
            href: "/s/[subcategoryId]",
          },
        ],
      }
    }
    // const mainProductImage = result.product.media.full[0]
    // mainProductImage.src = await getBase64ForImage(mainProductImage.src)

    return fulfillAPIRequest(req, {
      appData: createAppData,
      pageData,
    })
  }
}

export default withTransaction(productHandlerFactory)
