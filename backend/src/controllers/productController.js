const Product = require("../models/producto");

// Ver todos productos
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Upss... hubo un error en el servidor");
  }
};

// Ver un solo producto
exports.getProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ msg: "El producto no existe" });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Upss... hubo un error en el servidor");
  }
};

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
  try {
    const {
      code,
      category,
      description,
      image,
      price,
      quantity,
      rating,
      title,
    } = req.body;

    const newProduct = new Product({
      code: code,
      category: category,
      description: description,
      image: image,
      price: price,
      quantity: quantity,
      rating: rating,
      title: title,
    });

    const product_exits = await Product.findOne({ code: code });

    if (!product_exits) {
      await newProduct.save();
      res.status(200).send(newProduct);
    } else {
      return res.status(401).send("El producto ya se encuetra registrado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Upss... hubo un error en el servidor. " + error);
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    console.log(req.body);
    const {
      code,
      category,
      description,
      image,
      price,
      quantity,
      rating,
      title,
    } = req.body;

    let dataProduct = await Product.findById(req.params.id);

    // Validación
    if (!dataProduct) {
      res.status(404).json({ msg: "El producto no existe" });
    }

    dataProduct.code = code;
    dataProduct.category = category;
    dataProduct.description = description;
    dataProduct.image = image;
    dataProduct.price = price;
    dataProduct.quantity = quantity;
    dataProduct.rating = rating;
    dataProduct.title = title;

    dataProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      dataProduct,
      { new: true }
    );

    res.json(dataProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Upss... hubo un error en el servidor. " + error);
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    let dataProduct = await Product.findById(req.params.id);

    if (!dataProduct) {
      res.status(404).json({ error: "El producto no existe" });
    }

    await Product.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "El producto fue eliminado corractamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Upss... hubo un error en el servidor. " + error);
  }
};
