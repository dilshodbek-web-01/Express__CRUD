import express from "express";
import {
  getFruits,
  getFruitsOne,
  createFruit,
  deleteFruit,
  updateFruit,
} from "../controller/fruits.ctr.js";

const router = express.Router();

router.route("/list").get(getFruits).post(createFruit);

router
  .route("/list/:id")
  .get(getFruitsOne)
  .delete(deleteFruit)
  .put(updateFruit);

router.all("*", (req, res) => {
  res.send(`<h1>Not Found 404</h1>`);
});

export default router;
