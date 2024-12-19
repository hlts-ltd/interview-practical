import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      id: "d012d9ce-e7d0-416c-9f03-ab2290fd8d76",
      email: 'alice@example.com',
      name: 'Alice Smith',
      imageUrl: "https://avatar.iran.liara.run/public/10",
      passwordHash: "asdfasdfasdfasdf",
      sessions: {
        create: [
          {
            id: 'asdfasdfasd', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'Alice in Wonderland',
          },
      },
      music: {
        create: {
          title: 'Hit me baby one more time',
          artist: 'Britney Spears',
          genre: 'Pop',
          rating: 8
        }
      }
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      id: "97579e4e-5540-4ef4-9205-2fbfe454f543",
      email: 'bob@example.com',
      name: 'Bob Oden',
      imageUrl: "https://avatar.iran.liara.run/public/11",
      passwordHash: "asdfasdfasdfasdf3",
      sessions: {
        create: [
          {
            id: 'asdfasdfasddd', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'Bob the builder',
          },
      },
      music: {
        create: {
          title: 'Torn',
          artist: 'Natalie Imbruglia',
          genre: 'Rap',
          rating: 8
        }
      }
    },
  });

  const rashid = await prisma.user.upsert({
    where: { email: 'rashid@gmail.com' },
    update: {},
    create: {
      id: "f252a066-6ff3-4a5f-be59-fe7af4b5f3f3",
      email: 'rashid@gmail.com',
      name: 'Rashid Omar',
      imageUrl: "https://avatar.iran.liara.run/public/12",
      passwordHash: "asdfasdfasdfasdf",
      sessions: {
        create: [
          {
            id: 'asdfasdfasdsdf', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'Once voted the coolest guy in the neighborhood',
          },
      },
      music: {
        create: {
          title: 'Me against the world',
          artist: 'Tupac Shakur',
          genre: 'Rap',
          rating: 8
        }
      }
    },
  });


  const james = await prisma.user.upsert({
    where: { email: 'james@gmail.com' },
    update: {},
    create: {
      id: "4ef8c6f9-8f65-4321-b78a-97ada2582e4d",
      email: 'james@gmail.com',
      name: 'James Jones',
      imageUrl: "https://avatar.iran.liara.run/public/13",
      passwordHash: "asdfasdfasdfasdf",
      sessions: {
        create: [
          {
            id: 'asdfasdfasdfadsfasdf', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'In James we trust.',
          },
      },
      music: {
        create: {
          title: 'Hey Ya!',
          artist: 'Outkast',
          genre: 'Pop',
          rating: 8
        }
      }
    },
  });


  const samantha = await prisma.user.upsert({
    where: { email: 'samantha@gmail.com' },
    update: {},
    create: {
      id: "c0d27e09-781b-4977-9dbb-ce5dc572ba2b",
      email: 'samantha@gmail.com',
      name: 'Samantha Lloyd',
      imageUrl: "https://avatar.iran.liara.run/public/14",
      passwordHash: "asdfasdfasdfasdf",
      sessions: {
        create: [
          {
            id: 'asdfasdfasd11', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'What more can be said about Sam',
          },
      },
      music: {
        create: {
          title: 'Purple Rain',
          artist: 'Prince',
          genre: 'Rap',
          rating: 8
        }
      }
    },
  });



  const jaspar = await prisma.user.upsert({
    where: { email: 'Jaspar@gmail.com' },
    update: {},
    create: {
      id: "a8f51915-e757-4d4b-a435-b995b1b4c95f",
      email: 'Jaspar@gmail.com',
      name: 'Jaspar Gupta',
      imageUrl: "https://avatar.iran.liara.run/public/15",
      passwordHash: "asdfasdfasdfasdf",
      sessions: {
        create: [
          {
            id: 'asdfasdfasd22', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'Put the J in Javascript',
          },
      },
      music: {
        create: {
          title: 'Beat it',
          artist: 'Michael Jackson',
          genre: 'Pop',
          rating: 8
        }
      }
    },
  });


  const steve = await prisma.user.upsert({
    where: { email: 'steve@gmail.com' },
    update: {},
    create: {
      id: "2dbb67b5-6cc3-4645-b1d5-379cb95752f5",
      email: 'steve@gmail.com',
      name: 'Steve Lewis',
      imageUrl: "https://avatar.iran.liara.run/public/16",
      passwordHash: "asdfasdfasdfasdf",
      sessions: {
        create: [
          {
            id: 'asdfasdfasd33', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'Steve knows one or two things',
          },
      },
      music: {
        create: {
          title: 'Wonderful world',
          artist: 'Louise Armstrong',
          genre: 'Soul',
          rating: 8
        }
      }
    },
  });


  const andrew = await prisma.user.upsert({
    where: { email: 'andrew@gmail.com' },
    update: {},
    create: {
      id: "2b1c099c-2d19-4d39-ba08-b2470bab7c48",
      email: 'andrew@gmail.com',
      name: 'Andrew Hicks',
      imageUrl: "https://avatar.iran.liara.run/public/17",
      passwordHash: "asdfasdfasdfasdf",
      sessions: {
        create: [
          {
            id: 'asdfasdfasd44', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'Born in the rough neighbourhoods of Manhattan',
          },
      },
      music: {
        create: {
          title: 'Like a Virgin',
          artist: 'Madonna',
          genre: 'Pop',
          rating: 8
        }
      }
    },
  });


  const jones = await prisma.user.upsert({
    where: { email: 'jones@gmail.com' },
    update: {},
    create: {
      id: "18308b0f-0ca9-4129-adb8-e825e7fed5af",
      email: 'jones@gmail.com',
      name: 'Jones Nasir',
      imageUrl: "https://avatar.iran.liara.run/public/18",
      passwordHash: "asdfasdfasdfasdf",
      sessions: {
        create: [
          {
            id: 'asdfasdfasd55', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'Forever young',
          },
      },
      music: {
        create: {
          title: 'Juicy',
          artist: 'Notorious BIG',
          genre: 'Rap',
          rating: 8
        }
      }
    },
  });


  const michael = await prisma.user.upsert({
    where: { email: 'michael@gmail.com' },
    update: {},
    create: {
      id: "53dd9148-ea10-49db-9ee7-6127d9376ca4",
      email: 'michael@gmail.com',
      name: 'Michael Moore',
      imageUrl: "https://avatar.iran.liara.run/public/19",
      passwordHash: "asdfasdfasdfasdf",
      sessions: {
        create: [
          {
            id: 'asdfasdfasd66', 
            expiresAt: new Date()
          },
        ]
      },
      profile: {
        create: 
          {
            bio: 'Up and coming movie director',
          },
      },
      music: {
        create: {
          title: 'The Hansons',
          artist: 'Mmmbop',
          genre: 'Pop',
          rating: 8
        }
      }
    },
  });

  

  console.log({ alice, bob, rashid, james, samantha, jaspar, steve, andrew, jones, michael })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })