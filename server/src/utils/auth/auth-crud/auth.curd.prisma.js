/**
 *  Auth crud
 *  ----------
 *  this module aims to have the functions that
 *  calls the database from a single point (this file)
 *  and these functions are used in auth process as
 *
 *  orm used are prisma
 *
 *  1 - find user by email          => findUser
 *  2 - find user by id             => findUserById
 *  3 - find or create google user  => findOrCreateGoogleUser
 *  4 - get user for inital state   => getUser
 *  5 - login ( find then get user ) => login
 *
 */

// ---------------------------------------------------------

import { bcryptHash, bcryptVerifyHash } from "../../cryptography/hashing";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info" /* "query" */] });

// ---------------------------------------------------------

// Create user are now for operators only ( doctor or assistants )
export const createUser = async ({ email, password, name, userType }) =>
  prisma.user.create({
    data: {
      email,
      name,
      password: await bcryptHash(password),
      userType,
    },
  });

// ---------------------------------------------------------

export const findUser = async ({ email }) => {
  if (!email) return false;
  return await prisma.user.findUnique({ where: { email } });
};

// ---------------------------------------------------------

export const findUserById = async ({ id }) => {
  if (!id) return false;
  return await prisma.user.findUnique({ where: { id } });
};
// ---------------------------------------------------------

export const getUser = async ({ id }) =>
  await prisma.user.findUnique({ where: { id } });

// ---------------------------------------------------------

export const findOrCreateGoogleUser = async (payload) => {
  let user = await prisma.user.findUnique({
    where: { googleId: payload?.googleId },
  });

  if (!user) {
    user = await prisma.user.create({ data: payload });
  }

  return user;
};

// ---------------------------------------------------------

/**
 * OAuth Login User
 *
 * login function are customized fot the project
 *
 * @param {*} email , password
 * @returns  user , services , accessToken
 */
export const login = async ({ email, password }) => {
  if (!email || !password) return false;

  const user = await findUser({ email });

  if (!user) return false;

  const isPasswordMatched = !!(await bcryptVerifyHash(password, user.password));

  if (!isPasswordMatched) return false;

  const userData = await getUser({ id: user.id });

  const accessToken = jwt.sign(user, process.env.jwtSecret, {
    expiresIn: process.env.jwtExpires,
  });

  return { user: userData, accessToken };
};

// ---------------------------------------------------------

export const me = async ({ user }) => {
  const accessToken = jwt.sign(user, process.env.jwtSecret, {
    expiresIn: process.env.jwtExpires,
  });

  const updatedUser = await findUser({ email: user.email });

  return { accessToken, user: updatedUser };
};
