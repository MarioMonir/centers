/**
 *  User Service
 * ------------------------------------
 * this module aim to carry custom bussniess logic
 * for entity if entity not just CRUD
 *
 * you can add here any bussiness logic you need
 * and will be calls from entity controller
 *
 * Entity Flow
 * router --> controller --> service --> controller
 *
 */

// ------------------------------------------------------------

import { bcryptHash } from "../../utils/cryptography/hashing";
import { PrismaClient } from "@prisma/client";

// ------------------------------------------------------------

const prisma = new PrismaClient();

// ------------------------------------------------------------

const userService = {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  create: async ({ password, ...body }) =>
    prisma.user.create({
      data: {
        ...body,
        password: await bcryptHash(password),
      },
    }),

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  getMyGroups: async ({ studentId }) => {
    return prisma.enrolment.findMany({
      where: {
        studentId,
      },
      select: {
        group: true,
      },
    });
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
};

// ------------------------------------------------------------------

export default userService;
