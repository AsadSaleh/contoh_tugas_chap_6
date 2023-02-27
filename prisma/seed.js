const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const asad = await prisma.userGame.upsert({
    where: { username: "asad_ganim" },
    update: {},
    create: {
      username: "asad_ganim",
      password: "test123",
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
    },
  });

  console.log({ asad, laksman });
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
