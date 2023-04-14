//fake data

import { db } from '../src/lib/db';

async function main() {
  //upset is update or create
  const user = await db.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      email: 'user@email.com',
      firstName: 'User',
      lastName: 'Person',
      password: 'password',
      blogs: {
        create: new Array(10).fill(1).map((_, i) => ({
          title: `Project ${i}`,
          description: `This is a new blog that im creating for seed data`,
        })),
      },
    },
    include: {
      blogs: true,
    },
  });

  console.log({ user });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
