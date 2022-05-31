/**
 *
 *
 *
 *
 */

// -------------------------------------------------------------

import { createUser, login, me } from "../auth-crud/auth.curd.prisma";

// /api/oauth/me
export const meController = async (req, res, next) => {
  const user = await me({ user: req.user });
  res.status(202).json({ ...user });
};

// -------------------------------------------------------------

// /api/oauth/register
export const registerController = async (req, res, next) => {
  try {
    const { email, password, userType, name } = req?.body;

    if (!email || !password || !userType || !name) {
      throw {
        status: 400,
        message: "email ,password ,userType , name  are required",
      };
    }

    const user = await createUser({ email, password, userType, name });
    if (!user) {
      return res.status(400).json({ message: "cant create user" });
    }

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// -------------------------------------------------------------

// /api/oauth/login
export const loginController = async (req, res, next) => {
  try {
    const email = req?.body?.email;
    const password = req?.body?.password;

    if (!email || !password) {
      throw {
        status: 400,
        message: "email ,password are required",
      };
    }

    const user = await login({ email, password });
    if (!user) return res.status(401).json({ message: "User not found" });
    return res.status(202).json({ ...user });
  } catch (error) {
    next(error);
  }
};
