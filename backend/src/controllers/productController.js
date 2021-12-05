const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Product = require("../models/producto");

exports.addProduct = async (req, res) => {
  try {
    const {
      category,
      description,
      image,
      price,
      quantity,
      rating,
      title,
      total,
    } = req.body;

    const newProduct = new Product({
      category: category,
      description: description,
      image: image,
      price: price,
      quantity: quantity,
      rating: rating,
      title: title,
      total: total,
    });

    const product_exits = await product.findOne({ title: title });

    if (!product_exits) {
      await newProduct.save();
    } else {
      return res.status(401).send("El producto ya se encuetra registrado");
    }

    const token = jwt.sign({ _id: newProduct._id }, "productokay");

    res.status(200).json({ token: token, name: newProduct.title });
  } catch (error) {
    console.log(error);
    res.status(500).send("Upss... hubo un error en el servidor. " + error);
  }
};

// Ver productos
exports.products = (req, res) => {
  res.json([
    {
      category: "Moda",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nihil tempora soluta quidem suscipit.",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      price: 20000,
      quantity: 20,
      rating: 5,
      title: "Mens Casual Slim Fit",
      total: 25000,
    },
    {
      category: "Moda",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nihil tempora soluta quidem suscipit.",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      price: 20000,
      quantity: 20,
      rating: 5,
      title: "Mens Casual Slim Fit",
      total: 25000,
    },
    {
      category: "Moda",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nihil tempora soluta quidem suscipit.",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      price: 20000,
      quantity: 20,
      rating: 5,
      title: "Mens Casual Slim Fit",
      total: 25000,
    },
  ]);
};
