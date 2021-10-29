import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "./../models/productModel.js";

const productRouter = express.Router();

// Sending the products from database to the frontend
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProduct = await Product.insertMany(data.products);
    res.send(createdProduct);
  })
);

// API for products Details
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Products Not Found" });
    }
  })
);

export default productRouter;
