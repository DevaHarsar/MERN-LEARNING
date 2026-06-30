import dotenv from "dotenv";
const result = dotenv.config();

console.log(result);
console.log("MONGO_URI =", process.env.MONGO_URI);

import mongoose from "mongoose";
import Product from "../models/products.model.js";

const products = [
  {
    title: "iPhone 16",
    description: "Apple's latest smartphone with A18 chip and advanced camera.",
    category: "smartphones",
    price: 999,
    discountPercentage: 10,
    rating: 4.8,
    stock: 35,
    brand: "Apple",
    thumbnail: "https://picsum.photos/400?random=1",
    images: [
      "https://picsum.photos/600?random=1",
      "https://picsum.photos/600?random=2",
    ],
  },
  {
    title: "Samsung Galaxy S25",
    description: "Premium Android smartphone with AMOLED display.",
    category: "smartphones",
    price: 899,
    discountPercentage: 12,
    rating: 4.7,
    stock: 40,
    brand: "Samsung",
    thumbnail: "https://picsum.photos/400?random=3",
    images: [
      "https://picsum.photos/600?random=3",
      "https://picsum.photos/600?random=4",
    ],
  },
  {
    title: "OnePlus 13",
    description: "Fast and smooth flagship smartphone.",
    category: "smartphones",
    price: 749,
    discountPercentage: 8,
    rating: 4.6,
    stock: 50,
    brand: "OnePlus",
    thumbnail: "https://picsum.photos/400?random=5",
    images: [
      "https://picsum.photos/600?random=5",
      "https://picsum.photos/600?random=6",
    ],
  },
  {
    title: "MacBook Air M3",
    description: "Lightweight laptop powered by Apple's M3 chip.",
    category: "laptops",
    price: 1299,
    discountPercentage: 7,
    rating: 4.9,
    stock: 20,
    brand: "Apple",
    thumbnail: "https://picsum.photos/400?random=7",
    images: [
      "https://picsum.photos/600?random=7",
      "https://picsum.photos/600?random=8",
    ],
  },
  {
    title: "Dell XPS 15",
    description: "Premium Windows laptop for professionals.",
    category: "laptops",
    price: 1499,
    discountPercentage: 10,
    rating: 4.7,
    stock: 18,
    brand: "Dell",
    thumbnail: "https://picsum.photos/400?random=9",
    images: [
      "https://picsum.photos/600?random=9",
      "https://picsum.photos/600?random=10",
    ],
  },
  {
    title: "HP Pavilion 15",
    description: "Reliable laptop for work and study.",
    category: "laptops",
    price: 799,
    discountPercentage: 15,
    rating: 4.4,
    stock: 25,
    brand: "HP",
    thumbnail: "https://picsum.photos/400?random=11",
    images: [
      "https://picsum.photos/600?random=11",
      "https://picsum.photos/600?random=12",
    ],
  },
  {
    title: "Sony WH-1000XM5",
    description: "Industry-leading noise cancelling headphones.",
    category: "headphones",
    price: 349,
    discountPercentage: 10,
    rating: 4.9,
    stock: 60,
    brand: "Sony",
    thumbnail: "https://picsum.photos/400?random=13",
    images: [
      "https://picsum.photos/600?random=13",
      "https://picsum.photos/600?random=14",
    ],
  },
  {
    title: "JBL Tune 770NC",
    description: "Wireless headphones with active noise cancellation.",
    category: "headphones",
    price: 129,
    discountPercentage: 18,
    rating: 4.5,
    stock: 80,
    brand: "JBL",
    thumbnail: "https://picsum.photos/400?random=15",
    images: [
      "https://picsum.photos/600?random=15",
      "https://picsum.photos/600?random=16",
    ],
  },
  {
    title: "Apple Watch Series 10",
    description: "Advanced smartwatch with fitness tracking.",
    category: "smartwatches",
    price: 499,
    discountPercentage: 5,
    rating: 4.8,
    stock: 45,
    brand: "Apple",
    thumbnail: "https://picsum.photos/400?random=17",
    images: [
      "https://picsum.photos/600?random=17",
      "https://picsum.photos/600?random=18",
    ],
  },
  {
    title: "Samsung Galaxy Watch 7",
    description: "Stylish smartwatch with health monitoring.",
    category: "smartwatches",
    price: 399,
    discountPercentage: 10,
    rating: 4.6,
    stock: 50,
    brand: "Samsung",
    thumbnail: "https://picsum.photos/400?random=19",
    images: [
      "https://picsum.photos/600?random=19",
      "https://picsum.photos/600?random=20",
    ],
  },
  {
    title: "Nike Air Max 270",
    description: "Comfortable lifestyle sneakers.",
    category: "footwear",
    price: 180,
    discountPercentage: 15,
    rating: 4.7,
    stock: 70,
    brand: "Nike",
    thumbnail: "https://picsum.photos/400?random=21",
    images: [
      "https://picsum.photos/600?random=21",
      "https://picsum.photos/600?random=22",
    ],
  },
  {
    title: "Adidas Ultraboost",
    description: "High-performance running shoes.",
    category: "footwear",
    price: 190,
    discountPercentage: 12,
    rating: 4.8,
    stock: 55,
    brand: "Adidas",
    thumbnail: "https://picsum.photos/400?random=23",
    images: [
      "https://picsum.photos/600?random=23",
      "https://picsum.photos/600?random=24",
    ],
  },
  {
    title: "Levi's Men's Jeans",
    description: "Slim fit stretch denim jeans.",
    category: "mens-clothing",
    price: 79,
    discountPercentage: 20,
    rating: 4.5,
    stock: 120,
    brand: "Levi's",
    thumbnail: "https://picsum.photos/400?random=25",
    images: [
      "https://picsum.photos/600?random=25",
      "https://picsum.photos/600?random=26",
    ],
  },
  {
    title: "Women's Summer Dress",
    description: "Elegant floral casual dress.",
    category: "womens-clothing",
    price: 59,
    discountPercentage: 25,
    rating: 4.4,
    stock: 100,
    brand: "Zara",
    thumbnail: "https://picsum.photos/400?random=27",
    images: [
      "https://picsum.photos/600?random=27",
      "https://picsum.photos/600?random=28",
    ],
  },
  {
    title: "Canon EOS R10",
    description: "Mirrorless camera with 24MP sensor.",
    category: "cameras",
    price: 999,
    discountPercentage: 10,
    rating: 4.8,
    stock: 22,
    brand: "Canon",
    thumbnail: "https://picsum.photos/400?random=29",
    images: [
      "https://picsum.photos/600?random=29",
      "https://picsum.photos/600?random=30",
    ],
  },
  {
    title: "PlayStation 5",
    description: "Next-generation gaming console.",
    category: "gaming",
    price: 499,
    discountPercentage: 5,
    rating: 4.9,
    stock: 30,
    brand: "Sony",
    thumbnail: "https://picsum.photos/400?random=31",
    images: [
      "https://picsum.photos/600?random=31",
      "https://picsum.photos/600?random=32",
    ],
  },
  {
    title: "Xbox Series X",
    description: "Powerful gaming console with 1TB SSD.",
    category: "gaming",
    price: 499,
    discountPercentage: 6,
    rating: 4.8,
    stock: 28,
    brand: "Microsoft",
    thumbnail: "https://picsum.photos/400?random=33",
    images: [
      "https://picsum.photos/600?random=33",
      "https://picsum.photos/600?random=34",
    ],
  },
  {
    title: "LG 55-inch 4K Smart TV",
    description: "Ultra HD Smart LED TV with webOS.",
    category: "televisions",
    price: 699,
    discountPercentage: 18,
    rating: 4.7,
    stock: 20,
    brand: "LG",
    thumbnail: "https://picsum.photos/400?random=35",
    images: [
      "https://picsum.photos/600?random=35",
      "https://picsum.photos/600?random=36",
    ],
  },
  {
    title: "Philips Air Fryer",
    description: "Healthy cooking with rapid air technology.",
    category: "kitchen",
    price: 199,
    discountPercentage: 15,
    rating: 4.6,
    stock: 65,
    brand: "Philips",
    thumbnail: "https://picsum.photos/400?random=37",
    images: [
      "https://picsum.photos/600?random=37",
      "https://picsum.photos/600?random=38",
    ],
  },
  {
    title: "Prestige Pressure Cooker",
    description: "5L stainless steel pressure cooker.",
    category: "kitchen",
    price: 89,
    discountPercentage: 20,
    rating: 4.5,
    stock: 75,
    brand: "Prestige",
    thumbnail: "https://picsum.photos/400?random=39",
    images: [
      "https://picsum.photos/600?random=39",
      "https://picsum.photos/600?random=40",
    ],
  },
  {
    title: "Wooden Office Desk",
    description: "Modern wooden office desk for home workspace.",
    category: "furniture",
    price: 299,
    discountPercentage: 10,
    rating: 4.4,
    stock: 15,
    brand: "IKEA",
    thumbnail: "https://picsum.photos/400?random=41",
    images: [
      "https://picsum.photos/600?random=41",
      "https://picsum.photos/600?random=42",
    ],
  },
  {
    title: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support.",
    category: "furniture",
    price: 249,
    discountPercentage: 12,
    rating: 4.6,
    stock: 25,
    brand: "GreenSoul",
    thumbnail: "https://picsum.photos/400?random=43",
    images: [
      "https://picsum.photos/600?random=43",
      "https://picsum.photos/600?random=44",
    ],
  },
  {
    title: "Boat Stone 1200 Speaker",
    description: "Portable Bluetooth speaker with deep bass.",
    category: "audio",
    price: 89,
    discountPercentage: 18,
    rating: 4.5,
    stock: 90,
    brand: "Boat",
    thumbnail: "https://picsum.photos/400?random=45",
    images: [
      "https://picsum.photos/600?random=45",
      "https://picsum.photos/600?random=46",
    ],
  },
  {
    title: "Mi Power Bank 20000mAh",
    description: "Fast charging high-capacity power bank.",
    category: "accessories",
    price: 49,
    discountPercentage: 22,
    rating: 4.6,
    stock: 150,
    brand: "Xiaomi",
    thumbnail: "https://picsum.photos/400?random=47",
    images: [
      "https://picsum.photos/600?random=47",
      "https://picsum.photos/600?random=48",
    ],
  },
  {
    title: "Amazon Kindle Paperwhite",
    description: "Waterproof e-reader with glare-free display.",
    category: "ebooks",
    price: 159,
    discountPercentage: 10,
    rating: 4.8,
    stock: 35,
    brand: "Amazon",
    thumbnail: "https://picsum.photos/400?random=49",
    images: [
      "https://picsum.photos/600?random=49",
      "https://picsum.photos/600?random=50",
    ],
  },
];


const createProducts = async () => {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Insert products into the database
    await Product.insertMany(products);
    console.log("Products inserted successfully");
  }
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

createProducts();