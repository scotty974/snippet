import { optional, string, z } from "zod";

const snippetValidation = z.object({
  // user_id : z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.number()),
  category_id : z.number()

});

export default snippetValidation;