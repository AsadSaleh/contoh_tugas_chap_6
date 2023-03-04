const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const asad = await prisma.userGame.upsert({
    where: { username: "asad_ganim" },
    update: {},
    create: {
      username: "asad_ganim",
      password: "test123",
      userGameBiodata: {
        create: {
          age: 30,
          city: "Jakarta",
          gender: "male",
          name: "As'ad Saleh",
        },
      },
    },
  });

  const laksman = await prisma.userGame.upsert({
    where: {
      username: "deny_laksman",
    },
    update: {},
    create: {
      username: "deny_laksman",
      password: "99ii99",
      userGameBiodata: {
        create: {
          age: 25,
          city: "semarang",
          gender: "male",
          name: "Dieny Laksman",
        },
      },
    },
  });

  const kurnia = await prisma.userGame.upsert({
    where: {
      username: "kurnia_w",
    },
    update: {},
    create: {
      username: "kurnia_w",
      password: "99ii99",
      userGameBiodata: {
        create: {
          age: 24,
          city: "kudus",
          gender: "male",
          name: "Kurnia Widiyantoro",
        },
      },
    },
  });

  const melia = await prisma.userGame.upsert({
    where: {
      username: "meliaa",
    },
    update: {},
    create: {
      username: "meliaa",
      password: "99ii99",
      userGameBiodata: {
        create: {
          age: 22,
          city: "bandung",
          gender: "female",
          name: "Melia Dilasari",
        },
      },
    },
  });

  console.log({ asad, laksman, kurnia, melia });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
