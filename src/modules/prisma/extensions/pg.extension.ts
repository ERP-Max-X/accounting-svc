import { Prisma } from '@prisma/postgres/client';

export const pgExtension = Prisma.defineExtension({
  name: 'prisma-postgres', //Extension name
  model: {
    $allModels: {
      async softDelete<T extends { id: number }>(
        this: any,
        id: number,
      ): Promise<T> {
        const context = Prisma.getExtensionContext(this);

        return await (context as any).update({
          where: { id },
          data: { deleted_at: new Date() },
        });
      },
    },
  },
});
