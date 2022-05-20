/**
 *  Auth crud
 *  ----------
 *  this module aims to have the functions that
 *  calls the database from a single point (this file)
 *  and these functions are used in auth process as
 *
 *  orm used are prisma
 *
 *  1 - find user by id            => findUser
 *  2 - find or create google user => findOrCreateGoogleUser
 *
 */

// ---------------------------------------------------------

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info" /* "query" */] });

// ---------------------------------------------------------

export const findUser = async ({ id }) =>
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
