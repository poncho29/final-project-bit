const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    category: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    image: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    quantity: {
      type: Number,
      require: true,
      trim: true,
    },
    rating: {
      type: Number,
      require: false,
      trim: true,
    },
    title: {
      type: String,
      require: true,
      trim: true,
    },
    total: {
      type: Number,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("producto", productSchema);
