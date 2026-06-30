import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },

    brand: {
      type: String,
    },
    thumbnail: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);


const Product = mongoose.model("Product", productSchema);

export default Product;
