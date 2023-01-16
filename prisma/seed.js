const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUsers = await prisma.user.createMany({
    data: [
      { username: "alicem", email: "alice@gmail.com" },
      { username: "joelzor", email: "joel@yahoo.co.uk", isAdmin: true },
    ],
  });

  // Add your code here
  const createdProfile = await prisma.profile.create({
    data: {
      profilePic: "http://fakeimages.com/joel-profile-pic",
      bio: "creater of the joelzor bloggosphere!",
      user: {
        connect: {
          id: 2,
        },
      },
    },
  });

  const createdPost = await prisma.post.create({
    data: {
      title: "I had a terrible day",
      body: "Hello folks. Wasn't my best day today. Let me tell you why in so many words... ",
      published: true,
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });

  const createdPost2 = await prisma.post.create({
    data: {
      title: "How to rule the world in 3 simple steps",
      body: "In the following text, I will outline exactly how to rule the world financially, militarily and morally. Put down your phone and pay attention... ",
      pictureURL: "http://worlddomination.net/throne",
      published: false,
      user: {
        connect: {
          id: 2,
        },
      },
    },
  });

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
