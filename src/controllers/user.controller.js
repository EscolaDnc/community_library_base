import userService from "../services/user.service.js";

async function createUserController(req, res) {
  const newUser = req.body;

  try {
    const token = await userService.createUserService(newUser);
    res.status(201).send(token);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function findAllUserController(req, res) {
  try {
    const users = await userService.findAllUserService();
    return res.send(users);
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

async function findUserByIdController(req, res) {
  try {
    const userId = req.params.id;
    const user = await userService.findUserByIdService(userId);
    return res.send(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function updateUserController(req, res) {
  try {
    const newUser = req.body;
    const userId = req.userId;
    const response = await userService.updateUserService(newUser, userId);
    return res.send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function deleteUserController(req, res) {
  try {
    const userId = req.userId;
    const response = await userService.deleteUserController(userId);
    return res.send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export default {
  createUserController,
  findAllUserController,
  findUserByIdController,
  updateUserController,
  deleteUserController
};
