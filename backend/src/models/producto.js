const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    code: {
      type: String,
      require: true,
      trim: true,
      unique: true
    },
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      require: true,
      trim: true,
    },
    image: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("producto", productSchema);
