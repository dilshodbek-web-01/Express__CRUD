import express from "express";
import {
  getUsers,
  getUserOne,
  createUser,
  deleteUser,
  updateUser,
} from "../controller/users.ctr.js";

const router = express.Router();

router.route("/list").get(getUsers).post(createUser);

router.route("/list/:id").get(getUserOne).delete(deleteUser).put(updateUser);

router.all("*", (req, res) => {
  res.send(`<h1>Not Found 404</h1>`);
});

export default router;
