import { read, write } from "../utils/utils.js";
import * as uuid from "uuid";

const getAnimals = (req, res) => {
  const animals = read("animals");
  res.send(JSON.stringify(animals));
};

const getAnimalsOne = (req, res) => {
  const { id } = req.params;
  const animals = read("animals");

  const foundedAnimal = animals.find((el) => el.id === id);
  if (!foundedAnimal)
    return res.status(400).send({ message: "Animal not found !." });

  delete foundedAnimal.id;
  res.status(200).send(JSON.stringify(foundedAnimal));
};

const createAnimal = (req, res) => {
  const { name, type, color } = req.body;
  const animals = read("animals");
  animals.push({
    id: uuid.v4(),
    name,
    type,
    color,
  });
  write("animals", animals);
  res.status(200).send(
    JSON.stringify({
      message: "New animal added !.",
    })
  );
};

const deleteAnimal = (req, res) => {
  const { id } = req.params;
  const animals = read("animals");
  const foundedAnimal = animals.find((el) => el.id === id);
  if (!foundedAnimal)
    return res.status(400).send({ message: "Animal not found !." });

  animals.forEach((el, idx) => {
    if (el.id === id) {
      animals.splice(idx, 1);
    }
  });

  write("animals", animals);

  return res.send({
    message: "Deleted animal!.",
  });
};

const updateAnimal = (req, res) => {
  const { id } = req.params;
  const { name, type, color } = req.body;
  const animals = read("animals");

  const foundedAnimal = animals.find((el) => el.id === id);
  if (!foundedAnimal)
    return res.status(400).send({ message: "Animal not found !." });

  animals.forEach((el) => {
    if (el.id === id) {
      (el.name = name ? name : el.name),
        (el.type = type ? type : el.type),
        (el.color = color ? color : el.color);
    }
  });

  write("animals", animals);

  res.status(200).send(JSON.stringify({ message: "Successfully Updated !." }));
};
export { getAnimals, getAnimalsOne, createAnimal, deleteAnimal, updateAnimal };
