import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info" /* "query" */] });

//----------------------------------------------------------------

// Seed Services
(async () => {
  try {
    await prisma.service.createMany({
      data: [
        { name: "كشف" },
        { name: "إستشارة" },
        { name: "أخرى" },
        { name: "عمليات" },
      ],
      skipDuplicates: true,
    });
  } catch (error) {
    console.error(error);
  }
})();

//----------------------------------------------------------------
