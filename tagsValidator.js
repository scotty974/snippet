import { z } from "zod";

const tagValidator = z.object({
    name : z.string().max(10)

});

export default tagValidator;