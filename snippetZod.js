import { optional, string, z } from "zod";

const snippetValidation = z.object({
  // user_id : z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.optional(z.string()),
  category_id : z.number()

});

export default snippetValidation;