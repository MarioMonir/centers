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

// ---------------------------------------------------------

import { PrismaClient } from "@prisma/client";
import { ceil } from "lodash";
const prisma = new PrismaClient({ log: ["info" /* "query" */] });

// ------------------------------------------------------------

const attendanceService = {
  takeAttendance: async (body) => {
    console.log("body=>", body);
    await prisma.$transaction(async (prisma) => {
      // ===============================================================
      // get the group info

      const group = await prisma.group.findUnique({
        where: {
          id: body.attendance.groupId,
        },
      });

      // ===============================================================
      // insert attendance line

      await prisma.attendance.create({
        data: {
          // ...body.attendance,
          lectureNumber: body.attendance.currentLectureNumber,
          groupId: body.attendance.groupId,
          studentId: body.attendance.studentId,
        },
      });

      // ===============================================================
      // payOnEntry

      if (body.flow) {
        const updatedEnrolmentForPayment = await prisma.enrolment.update({
          where: {
            groupId_studentId: {
              groupId: body.attendance.groupId,
              studentId: body.attendance.studentId,
            },
          },
          data: {
            balance: {
              increment: body.flow.credit,
            },
          },
        });

        await prisma.flow.create({
          data: { ...body.flow, balance: updatedEnrolmentForPayment.balance },
        });
      }

      // ===============================================================
      // lecture numbering
      // add lecture date currentLectureNumber to handle Lecture Auto-Numbering

      const currentLectureNumber = group.currentLectureNumber;
      if (currentLectureNumber !== body.attendance.currentLectureNumber) {
        let newActualLectureDates = group.actualLectureDates;
        newActualLectureDates.push(new Date().toDateString());
        await prisma.group.update({
          where: { id: body.attendance.groupId },
          data: {
            actualLectureDates: newActualLectureDates,
            currentLectureNumber: body.attendance.currentLectureNumber,
          },
        });
      }

      // ===============================================================
      // student balance decrement

      // enrolment record
      const Enrolment = await prisma.enrolment.findUnique({
        where: {
          groupId_studentId: {
            groupId: body.attendance.groupId,
            studentId: body.attendance.studentId,
          },
        },
      });

      // for normal students
      let paymentCost = group.paymentCost;
      let centerCostPerLecture = group.centerCostPerLecture;

      // for special students
      if (Enrolment.paymentCost) {
        paymentCost = Enrolment.paymentCost;
      }

      // for special students
      if (Enrolment.centerCostPerLecture) {
        centerCostPerLecture = Enrolment.centerCostPerLecture;
      }

      // ----------------------------------------------
      // decrement center cost

      const updatedEnrolmentForCenterCost = await prisma.enrolment.update({
        where: {
          groupId_studentId: {
            groupId: body.attendance.groupId,
            studentId: body.attendance.studentId,
          },
        },
        data: {
          balance: {
            decrement: centerCostPerLecture,
          },
        },
      });

      // centerCost record
      await prisma.flow.create({
        data: {
          fromUserId: body.attendance.studentId,
          toUserId: body.toUserId,
          groupId: body.attendance.groupId,
          debit: centerCostPerLecture,
          balance: updatedEnrolmentForCenterCost.balance,
          description: "centerCost",
          notes: "for lecture " + body.attendance.currentLectureNumber,
        },
      });
      // ----------------------------------------------
      // lecture cost

      if (group.paymentType === "Lecture") {
        // decrement lecture cost
        const updatedEnrolmentForLectureCost = await prisma.enrolment.update({
          where: {
            groupId_studentId: {
              groupId: body.attendance.groupId,
              studentId: body.attendance.studentId,
            },
          },
          data: {
            balance: {
              decrement: paymentCost,
            },
          },
        });

        // lectureCost record
        await prisma.flow.create({
          data: {
            fromUserId: body.attendance.studentId,
            toUserId: body.toUserId,
            groupId: body.attendance.groupId,
            debit: paymentCost,
            balance: updatedEnrolmentForLectureCost.balance,
            description: "lectureCost",
            notes: "for lecture " + body.attendance.currentLectureNumber,
          },
        });
      }

      // ----------------------------------------------
      // decrement month cost if it's the first lecture of the month

      const isFirstLectureInThisMonth =
        body.attendance.currentLectureNumber %
          group.numberOfLecturesPerMonth ===
        1;

      if (group.paymentType === "Month" && isFirstLectureInThisMonth) {
        const updatedEnrolmentForMonthCost = await prisma.enrolment.update({
          where: {
            groupId_studentId: {
              groupId: body.attendance.groupId,
              studentId: body.attendance.studentId,
            },
          },
          data: {
            balance: {
              decrement: paymentCost,
            },
          },
        });

        // monthCost record
        await prisma.flow.create({
          data: {
            fromUserId: body.attendance.studentId,
            toUserId: body.toUserId,
            groupId: body.attendance.groupId,
            debit: paymentCost,
            balance: updatedEnrolmentForMonthCost.balance,
            description: "monthCost",
            notes:
              "for month " +
              ceil(
                body.attendance.currentLectureNumber /
                  group.numberOfLecturesPerMonth
              ),
          },
        });
      }

      // ----------------------------------------------
      // decrement Installment cost

      const installmentCostDecrementRecords = await prisma.flow.findMany({
        where: {
          fromUserId: body.attendance.studentId,
          groupId: body.attendance.groupId,
          description: "installmentCost",
        },
      });

      if (
        group.paymentType === "Installment" &&
        installmentCostDecrementRecords.length === 0 // to insure one time decrement
      ) {
        const updatedEnrolmentForInstallmentCost =
          await prisma.enrolment.update({
            where: {
              groupId_studentId: {
                groupId: body.attendance.groupId,
                studentId: body.attendance.studentId,
              },
            },
            data: {
              balance: {
                decrement: paymentCost,
              },
            },
          });

        // installmentCost flow record
        await prisma.flow.create({
          data: {
            fromUserId: body.attendance.studentId,
            toUserId: body.toUserId,
            groupId: body.attendance.groupId,
            debit: paymentCost,
            balance: updatedEnrolmentForInstallmentCost.balance,
            description: "installmentCost",
          },
        });
      }

      // ===============================================================
    });
  },

  // ------------------------------------------------------------------

  getList: async ({ filter, limit, offset, order }) => {
    console.log({ filter });
    const count = prisma["enrolment"].count({
      where: filter,
    });
    const rows = prisma["enrolment"].findMany({
      where: filter,
      skip: offset,
      take: limit,
      orderBy: order,
    });
    console.log(rows);

    return Promise.all([count, rows]);
  },
};

// ------------------------------------------------------------------

export default attendanceService;
