import express from "express";
import {
  getAnimals,
  getAnimalsOne,
  createAnimal,
  deleteAnimal,
  updateAnimal,
} from "../controller/animals.ctr.js";

const router = express.Router();

// router.get("/list", getAnimals);
// router.post("/list", createAnimal);
router.route("/list").get(getAnimals).post(createAnimal);

// router.get("/list/:id", getAnimalsOne);
// router.delete("/delete/:id", deleteAnimal);
// router.put("/update/:id", updateAnimal);

router
  .route("/list/:id")
  .get(getAnimalsOne)
  .delete(deleteAnimal)
  .put(updateAnimal);

router.all("*", (req, res) => {
  res.send(`<h1>Not Found 404</h1>`);
});

export default router;
