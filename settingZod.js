import { z } from "zod";

const registerValidation = z.object({
    email: z.string().email(),
  password: z.string().min(4),
  picture: z.string().optional(),

});

export default registerValidation;