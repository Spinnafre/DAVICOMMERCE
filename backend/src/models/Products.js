import mongoose from "mongoose";

const ProductReview = new mongoose.Schema(
  {
    rating: { type: Number, default: 0 },
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brande: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  QtdStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  reviews: [ProductReview],
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
