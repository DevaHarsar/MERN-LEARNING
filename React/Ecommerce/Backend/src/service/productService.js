import productModel from "../models/products.model.js";

export const ProductList = async (query) => {
  const {
    q,
    category,
    brand,
    minPrice,
    maxPrice,
    minRating,
    sort,
    page = 1,
    limit = 8,
  } = query;
  const filter = {};
  if (q) {
    filter.$or = [
      {
        title: {
          $regex: q,
          $options: "i",
        },
      },
      {
        description: {
          $regex: q,
          $options: "i",
        },
      },
      {
        category: {
          $regex: q,
          $options: "i",
        },
      },
      {
        brand: {
          $regex: q,
          $options: "i",
        },
      },
    ];
  }
  if (category) {
    filter.category = category;
  }
  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }
  if (brand) {
    filter.brand = {
      $regex: brand,
      $options: "i",
    };
  }

  if (minRating) {
    filter.rating = {
      $gte: Number(minRating),
    };
  }
  let sortOption = {};
  switch (sort) {
    case "price_asc":
      sortOption.price = 1;
      break;

    case "price_desc":
      sortOption.price = -1;
      break;

    case "newest":
      sortOption.createdAt = -1;
      break;

    default:
      sortOption.createdAt = -1;
  }
  const skip = (Number(page) - 1) * Number(limit);
  try {
    const products = await productModel
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));
    const totalProducts = await productModel.countDocuments(filter);
    return {
      products,
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / Number(limit)),
    };
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await productModel.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
};

export const createProductDetails = async (productData) => {
  try {
    const newProduct = await productModel.create(productData);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const updateProductDetails = async (productId, productData) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      productData,
      { new: true },
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export const deleteProductDetails = async (productId) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};
