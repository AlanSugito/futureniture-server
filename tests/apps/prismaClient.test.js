import {describe, it} from '@jest/globals';
import {prismaClient} from '../../src/apps';

describe('Prisma Client', () => {
  it('should connect to database', async () => {
    await prismaClient.$connect();
    await prismaClient.$disconnect();
  });
});
