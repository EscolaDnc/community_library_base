import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";
import userRepositories from "../repositories/user.repository.js";

async function createUserService(newUser) {
  const foundUser = await userRepositories.findByEmailUserRepository(
    newUser.email
  );
  if (foundUser) throw new Error("User already exists");
  const passHash = await bcrypt.hash(newUser.password, 10);
  const user = await userRepositories.createUserRepository({
    ...newUser,
    password: passHash,
  });
  if (!user) throw new Error("Error creating User");
  const token = authService.generateToken(user.id);
  return token;
}

async function findAllUserService() {
  const users = await userRepositories.findAllUserRepository();
  return users;
}

async function findUserByIdService(userId) {
  const user = await userRepositories.findByIdUserRepository(userId);
  if (!user) throw new Error("User not found");
  return user;
}

async function updateUserService(newUser, userId) {
  const user = await userRepositories.findByIdUserRepository(userId);
  if (!user) throw new Error("User not found");
  if (newUser.password)
    newUser.password = await bcrypt.hash(newUser.password, 10);
  await userRepositories.updateUserRepository(userId, user);
  return { message: "User successfully updated!" };
}

async function deleteUserService(userId) {
  const user = await userRepositories.findByIdUserRepository(userId);
  if (!user) throw new Error("User not found");
  await userRepositories.deleteUserRepository(userId);
  return { message: "User successfully deleted!" };
}

export default {
  createUserService,
  findAllUserService,
  findUserByIdService,
  updateUserService,
  deleteUserService,
};
