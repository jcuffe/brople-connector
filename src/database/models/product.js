import { Model } from "objection"
import colors, { colorForId } from "../../utils/colors"

class Product extends Model {
  static get tableName() {
    return "products"
  }

  // Input validation schema
  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        price: { type: "number" },
        rating: { type: "number" },
        thumbnail: { type: "string" },
        description: { type: "string" },
        specs: { type: "string" },
      },
    }
  }

  static get virtualAttributes() {
    return ["url", "priceText", "media", "sizes", "colors"]
  }

  get url() {
    return `/p/${this.id}`
  }

  get priceText() {
    return `${this.price}`
  }

  get media() {
    const color = colorForId(this.id)
    const variants = [color, "red", "blue"]
    return {
      full: this.images.map((image) => ({
        src: image.src,
        alt: image.alt,
        magnify: {
          height: image.height,
          width: image.width,
          src: image.src,
        },
      })),
      // full: variants.map((key, i) => ({
      //   src: `https://dummyimage.com/${i === 2 ? 400 : 600}x${
      //     i === 1 ? 400 : 600
      //   }/${colors[key].background}/${
      //     colors[key].foreground
      //   }?text=${encodeURIComponent("Product " + this.$beforeUpdateid)}`,
      //   alt: `Product ${this.id}`,
      //   magnify: {
      //     height: i === 1 ? 800 : 1200,
      //     width: i === 2 ? 800 : 1200,
      //     src: `https://dummyimage.com/${i === 2 ? 800 : 1200}x${
      //       i === 1 ? 800 : 1200
      //     }/${colors[key].background}/${
      //       colors[key].foreground
      //     }?text=${encodeURIComponent("Product " + this.id)}`,
      //   },
      // })),
      thumbnails: variants.map((key, i) => ({
        src: `https://dummyimage.com/${i === 2 ? 233 : 300}x${
          i === 1 ? 233 : 300
        }/${colors[key].background}/${
          colors[key].foreground
        }?text=${encodeURIComponent("Product " + this.id)}`,
        alt: `Product ${this.id}`,
      })),
    }
  }

  get sizes() {
    return [
      { id: "sm", text: "SM" },
      { id: "md", text: "MD" },
      { id: "lg", text: "LG" },
      { id: "xl", text: "XL", disabled: true },
      { id: "xxl", text: "XXL" },
    ]
  }

  get colors() {
    return Object.keys(colors)
      .slice(0, 2)
      .map((name, idx) => ({
        text: name,
        id: name,
        disabled: idx === 2,
        image: {
          src: `https://dummyimage.com/48x48/${
            colors[name].background
          }?text=${encodeURIComponent(" ")}`,
          alt: name,
        },
        media: {
          full: [name, name, name].map((key, i) => ({
            src: `https://dummyimage.com/${i === 2 ? 400 : 600}x${
              i === 1 ? 400 : 600
            }/${colors[key].background}/${
              colors[key].foreground
            }?text=${encodeURIComponent("Product " + this.id)}`,
            alt: `Product ${this.id}`,
            magnify: {
              height: i === 1 ? 800 : 1200,
              width: i === 2 ? 800 : 1200,
              src: `https://dummyimage.com/${i === 2 ? 800 : 1200}x${
                i === 1 ? 800 : 1200
              }/${colors[key].background}/${
                colors[key].foreground
              }?text=${encodeURIComponent("Product " + this.id)}`,
            },
          })),
          thumbnails: [name, name, name].map((key, i) => ({
            src: `https://dummyimage.com/${i === 2 ? 300 : 400}x${
              i === 1 ? 300 : 400
            }/${colors[key].background}/${
              colors[key].foreground
            }?text=${encodeURIComponent(`Product ${this.id}`)}`,
            alt: key,
          })),
          thumbnail: [name].map((key) => ({
            src: `https://dummyimage.com/400x400/${colors[key].background}/${
              colors[key].foreground
            }?text=${encodeURIComponent("Product " + this.id)}`,
            alt: `Product ${this.id}`,
          }))[0],
        },
      }))
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    import Image from "./image"
    return {
      images: {
        relation: Model.HasManyRelation,
        modelClass: Image,
        join: {
          from: this.ref("id"),
          to: Image.ref("productId"),
        },
      },
      sizes: {},
      colors: {},
    }
  }
}

export default Product
