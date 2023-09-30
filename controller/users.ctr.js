import { read, write } from "../utils/utils.js";
import * as uuid from "uuid";

const getUsers = (req, res) => {
  const users = read("users");
  res.send(JSON.stringify(users));
};

const getUserOne = (req, res) => {
  const { id } = req.params;
  const users = read("users");

  const foundedUser = users.find((el) => el.id === id);
  if (!foundedUser)
    return res.status(400).send({ message: "User not found !." });

  delete foundedUser.id;
  res.status(200).send(JSON.stringify(foundedUser));
};

const createUser = (req, res) => {
  const { name, education } = req.body;
  const users = read("users");
  users.push({
    id: uuid.v4(),
    name,
    education,
  });
  write("users", users);
  res.status(200).send(
    JSON.stringify({
      message: "New user added !.",
    })
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const users = read("users");
  const foundedUser = users.find((el) => el.id === id);
  if (!foundedUser)
    return res.status(400).send({ message: "User not found !." });

  users.forEach((el, idx) => {
    if (el.id === id) {
      users.splice(idx, 1);
    }
  });

  write("users", users);

  return res.send({
    message: "Deleted user !.",
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, education } = req.body;
  const users = read("users");

  const foundedUser = users.find((el) => el.id === id);
  if (!foundedUser)
    return res.status(400).send({ message: "User not found !." });

  users.forEach((el) => {
    if (el.id === id) {
      (el.name = name ? name : el.name),
        (el.education = education ? education : el.education);
    }
  });

  write("users", users);

  res.status(200).send(JSON.stringify({ message: "Successfully Updated !." }));
};
export { getUsers, getUserOne, createUser, deleteUser, updateUser };
