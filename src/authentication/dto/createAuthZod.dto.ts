import { z } from 'zod';  // z is a object of zod
export const createAuthSchema = z.object({
  name: z.string(), //validation condition of name
  email: z.string().email(), //validation condition of email
  password: z.string().min(8), //validation condition of password
}).required(); // required for whole object if we need take specific variable

export type createAuthZodDto = z.infer<typeof createAuthSchema> // export the validation pipe  