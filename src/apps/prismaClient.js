import {PrismaClient} from '@prisma/client';

const prismaClient = new PrismaClient({
  log: ['error'],
  errorFormat: 'pretty',
});

export default prismaClient;
