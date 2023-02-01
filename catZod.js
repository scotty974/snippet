import { z } from "zod";

const catValidation = z.object({
    name : z.string().max(10)

});

export default catValidation;