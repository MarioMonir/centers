/**
 *  Entity Service
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

/**
 *  you can call your orm here ( prisma ) and
 *  return what you want from database
 *
 *  import { PrismaClient } from "@prisma/client";
 *  const prisma = new PrismaClient();
 *
 *  const entityService = {
 *      create: (body) => prisma.user.create({ ...body }),
 *  };
 *
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ------------------------------------------------------------

const requestService = {
  update: (id, body) =>
    prisma.$transaction(async (prisma) => {
      // -------------------------------------------
      //change request status
      const request = await prisma.request.update({
        where: { id },
        data: { requestStatus: body.requestStatus },
      });

      // -------------------------------------------

      if (body.requestStatus !== "Accpeted") return Promise.resolve();

      //enroll student in the requested group
      await prisma.enrolment.create({
        data: {
          studentId: request.fromUserId,
          groupId: request.toGroupId,
          balance: body?.payment ? body?.payment : 0,
        },
      });

      // -------------------------------------------
      //payment flow record

      if (body?.payment) {
        const flowRecord = await prisma.flow.create({
          data: {
            fromUserId: request.fromUserId,
            toUserId: body.toUserId,
            groupId: request.toGroupId,
            credit: body.payment,
            balance: 0, //initially
            description: "enrolmentDownPayment",
            notes: "for group #" + request.toGroupId,
          },
        });

        await prisma.flow.update({
          where: {
            id: flowRecord.id,
          },
          data: {
            balance: {
              increment: body.payment,
            },
          },
        });
      }

      // -------------------------------------------
    }),
};

// ------------------------------------------------------------------

export default requestService;
