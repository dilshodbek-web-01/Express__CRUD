import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// dotenv.config()

// routes
import usersRouter from "./routers/users.router.js";
import animalsRouter from "./routers/animals.router.js";
import fruitsRouter from "./routers/fruits.router.js";
import carsRouter from "./routers/cars.router.js";

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/animals", animalsRouter);
app.use("/fruits", fruitsRouter);
app.use("/cars", carsRouter);

app.listen(port, () => console.log(port));
