import express from "express";
import {
  getCars,
  getCarsOne,
  createCar,
  deleteCar,
  updateCar,
} from "../controller/cars.ctr.js";

const router = express.Router();

router.route("/list").get(getCars).post(createCar);

router.route("/list/:id").get(getCarsOne).delete(deleteCar).put(updateCar);

router.all("*", (req, res) => {
  res.send(`<h1>Not Found 404</h1>`);
});

export default router;
