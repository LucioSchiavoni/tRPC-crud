
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({ id: z.string()});


const userSchemma = z.object({
  name: z.string(),
  email:z.string(),
});

const userUpdateSchemma = z.object({
  id: z.string(),
  name: z.string(),
  email:z.string(),
});

export const exampleRouter = createTRPCRouter({

    //get all User
    getAll: publicProcedure.query(({ctx}) => {
      return ctx.prisma.user.findMany();
    }),

    //get by id
    getOne: publicProcedure
    .input(idSchema)
    .query(({ input, ctx}) => {  //enviamos una query con un input y su contexto 
      return ctx.prisma.user.findUnique({  //busca en la bd el nombre de ese input que se ingreso
        where: idSchema.parse(input),
      });
    }),

    //create User 

    createUser: publicProcedure
    .input(userSchemma)
    .mutation(({ input, ctx}) => {
      return ctx.prisma.user.create({
        data: userSchemma.parse(input),
      });
    }),

    //update user

    updateUser: publicProcedure
    .input(userUpdateSchemma)
    .mutation(({ input, ctx}) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id.toString(),
        },
        data: userUpdateSchemma.parse(input),
      });
    }),

    //delete user
    deleteUser: publicProcedure
    .input(idSchema)
    .mutation(({ input, ctx}) => {
      return ctx.prisma.user.delete({
        where: idSchema.parse(input)
      });
    }),
    
});
