import { PrismaClient } from "@prisma/client";
import { ceil } from "lodash";
const prisma = new PrismaClient({ log: ["info" /* "query" */] });

// ------------------------------------------------------------------

const attendanceService = {
  // ------------------------------------------------------------------

  create: async (body) => {
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

      await prisma.attendance.create({ data: body.attendance });

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
          data: { ...body.flow, balance: updatedEnrolmentForPayment.balance }, // mi4 4rt ykon hwa hwa al balance
        });
      }

      // ===============================================================
      // add lecture date to handle Lecture Auto-Numbering

      const lectureDatesSize = group.actualLectureDates.length;
      let newaAtualLectureDates = group.actualLectureDates;
      if (lectureDatesSize === 0) {
        newaAtualLectureDates = [new Date().toDateString()];
        await prisma.group.update({
          where: { id: body.attendance.groupId },
          data: { actualLectureDates: newaAtualLectureDates },
        });
      } else {
        const lastLectureDate = group.actualLectureDates[lectureDatesSize - 1];
        if (new Date() - lastLectureDate > 24 * 60 * 60 * 1000) {
          newaAtualLectureDates.push(new Date().toDateString());
          await prisma.group.update({
            where: { id: body.attendance.groupId },
            data: { actualLectureDates: newaAtualLectureDates },
          });
        }
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
          notes: "for lecture " + body.attendance.lectureNumber,
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
            notes: "for lecture " + body.attendance.lectureNumber,
          },
        });
      }

      // ----------------------------------------------
      // decrement month cost

      const isFirstLectureInThisMonth =
        body.attendance.lectureNumber % group.numberOfLectures === 1;

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
              ceil(body.attendance.lectureNumber / group.numberOfLectures),
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

        // installmentCost record
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
};

// ------------------------------------------------------------------

export default attendanceService;

// ------------------------------------------------------------------
