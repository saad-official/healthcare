import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(10, {
      message: "Name must be at most 50 characters.",
    }),
    email:z.string().email("Invalid Email Address"),
    phone:z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number")

});
 