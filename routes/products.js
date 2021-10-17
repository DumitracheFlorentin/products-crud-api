import express from "express";
import productsData from "../data/products.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  try {
    res.json(productsData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET SPECIFIC PRODUCT
router.get("/:id", (req, res) => {
  try {
    const product = productsData.some(
      (item) => item._id === parseInt(req.params.id)
    );

    if (product) {
      res
        .status(200)
        .json(
          productsData.filter((item) => item._id === parseInt(req.params.id))
        );
    } else {
      res.status(404).json({ message: "Product does not exit!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// UPDATE A SPECIFIC PRODUCT
router.patch("/:id", (req, res) => {
  try {
    const product = productsData.some(
      (item) => item._id === parseInt(req.params.id)
    );

    if (product) {
      const updatedInfo = req.body;

      productsData.forEach((product) => {
        if (product._id === parseInt(req.params.id)) {
          product.name = updatedInfo.name ? updatedInfo.name : product.name;
          product.price = updatedInfo.price ? updatedInfo.price : product.price;
          product.qty = updatedInfo.qty ? updatedInfo.qty : product.qty;
          product.color = updatedInfo.name ? updatedInfo.name : product.color;
          product.description = updatedInfo.description
            ? updatedInfo.description
            : product.description;
        }
      });

      res.status(200).json({ msg: "The product was updated!" });
    } else {
      res.status(404).json({ message: "Product does not exit!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE SPECIFIC PRODUCT
router.delete("/:id", (req, res) => {
  try {
    const findId = productsData.some(
      (product) => product._id === parseInt(req.params.id)
    );

    if (findId) {
      let deleteId = parseInt(req.params.id);
      let value;

      productsData.forEach((product, index) => {
        if (product._id === deleteId) {
          value = index;
        }
      });

      productsData.splice(value, 1);

      res.status(200).json(productsData);
    } else {
      return res.status(404).json({ msg: "The product does not exist!" });
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// ADD PRODUCT
router.post("/", (req, res) => {
  try {
    const updatedInfo = req.body;

    const { _id, name, price, qty, color, description } = {
      _id: updatedInfo._id,
      name: updatedInfo.name,
      price: updatedInfo.price,
      qty: updatedInfo.qty,
      color: updatedInfo.color,
      description: updatedInfo.description,
    };

    if (_id && name && price && qty && color && description) {
      if (productsData.some((product) => product._id === parseInt(_id))) {
        res.status(400).json({ message: "The id already exists!" });
      } else {
        productsData.push({ _id, name, price, qty, color, description });
        res
          .status(201)
          .json({ message: "Product was added!", products: productsData });
      }
    } else {
      res.status(400).json({ message: "All fields must be completed!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
