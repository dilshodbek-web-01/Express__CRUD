import { read, write } from "../utils/utils.js";
import * as uuid from "uuid";

const getFruits = (req, res) => {
  const fruits = read("fruits");
  res.send(JSON.stringify(fruits));
};

const getFruitsOne = (req, res) => {
  const { id } = req.params;
  const fruits = read("fruits");

  const foundedFruit = fruits.find((el) => el.id === id);
  if (!foundedFruit)
    return res.status(400).send({ message: "Fruit not found !." });

  delete foundedFruit.id;
  res.status(200).send(JSON.stringify(foundedFruit));
};

const createFruit = (req, res) => {
  const { name, color, price } = req.body;
  const fruits = read("fruits");
  fruits.push({
    id: uuid.v4(),
    name,
    color,
    price,
  });
  write("fruits", fruits);
  res.status(200).send(
    JSON.stringify({
      message: "New fruit added !.",
    })
  );
};

const deleteFruit = (req, res) => {
  const { id } = req.params;
  const fruits = read("fruits");
  const foundedFruit = fruits.find((el) => el.id === id);
  if (!foundedFruit)
    return res.status(400).send({ message: "Fruit not found !." });

  fruits.forEach((el, idx) => {
    if (el.id === id) {
      fruits.splice(idx, 1);
    }
  });

  write("fruits", fruits);

  return res.send({
    message: "Deleted fruit!.",
  });
};

const updateFruit = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name, color, price } = req.body;
  const fruits = read("fruits");

  const foundedFruit = fruits.find((el) => el.id === id);
  if (!foundedFruit)
    return res.status(400).send({ message: "Fruit not found !." });

  fruits.forEach((el) => {
    if (el.id === id) {
      (el.name = name ? name : el.name),
        (el.color = color ? color : el.color),
        (el.price = price ? price : el.price);
    }
  });

  write("fruits", fruits);

  res.status(200).send(JSON.stringify({ message: "Successfully Updated !." }));
};
export { getFruits, getFruitsOne, createFruit, deleteFruit, updateFruit };
