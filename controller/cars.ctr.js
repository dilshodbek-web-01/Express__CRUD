import { read, write } from "../utils/utils.js";
import * as uuid from "uuid";

const getCars = (req, res) => {
  const cars = read("cars");
  res.send(JSON.stringify(cars));
};

const getCarsOne = (req, res) => {
  const { id } = req.params;
  const cars = read("cars");

  const foundedCar = cars.find((el) => el.id === id);
  if (!foundedCar) return res.status(400).send({ message: "Car not found !." });

  delete foundedCar.id;
  res.status(200).send(JSON.stringify(foundedCar));
};

const createCar = (req, res) => {
  const { name, color, price } = req.body;
  const cars = read("cars");
  cars.push({
    id: uuid.v4(),
    name,
    color,
    price,
  });
  write("cars", cars);
  res.status(200).send(
    JSON.stringify({
      message: "New car added !.",
    })
  );
};

const deleteCar = (req, res) => {
  const { id } = req.params;
  const cars = read("cars");
  const foundedCars = cars.find((el) => el.id === id);
  if (!foundedCars)
    return res.status(400).send({ message: "Car not found !." });

  cars.forEach((el, idx) => {
    if (el.id === id) {
      cars.splice(idx, 1);
    }
  });

  write("cars", cars);

  return res.send({
    message: "Deleted car!.",
  });
};

const updateCar = (req, res) => {
  const { id } = req.params;
  const { name, color, price } = req.body;
  const cars = read("cars");

  const foundedCars = cars.find((el) => el.id === id);
  if (!foundedCars)
    return res.status(400).send({ message: "Car not found !." });

  cars.forEach((el) => {
    if (el.id === id) {
      (el.name = name ? name : el.name),
        (el.color = color ? color : el.color),
        (el.price = price ? price : el.price);
    }
  });

  write("cars", cars);

  res.status(200).send(JSON.stringify({ message: "Successfully Updated !." }));
};
export { getCars, getCarsOne, createCar, deleteCar, updateCar };
