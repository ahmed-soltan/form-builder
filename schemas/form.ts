import * as z from 'zod'

export const formSchema = z.object({
    name: z.string().min(3, {
      message: "Name should be at least 3 characters long",
    }),
    description: z.string().min(10, {
      message: "Description should be at least 10 characters long",
    }),
  });