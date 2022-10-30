import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info" /* "query" */] });

//----------------------------------------------------------------

// Seed Services
(async () => {
  try {
    await prisma.user.createMany({
      data: [
        {
          name: "Raef",
          email: "Raef.mohamed.22@gmail.com",
          password:
            "$2b$10$3MfSZHgLRvapuesOrEMLmO1dzVAJhgLiFTbKKvsZlCp74wCeAGJ8u",
          userType: "Center",
        },
        {
          name: "Freddie",
          email: "Freddie@email.com",
          password:
            "$2b$10$3MfSZHgLRvapuesOrEMLmO1dzVAJhgLiFTbKKvsZlCp74wCeAGJ8u",
          userType: "Developer",
        },
      ],
      skipDuplicates: true,
    });
  } catch (error) {
    console.error(error);
  }
})();

//----------------------------------------------------------------
