import { z } from 'zod';
export const createProductSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }).max
    (50, { message: 'Name must be 50 characters or less' }),    
    price: z.number().min(1, { message: 'Price is required' }).max
    (100000, { message: 'Price must be 100,000 or less' }),
    quantity: z.number(),
    
}).required();

export type createProductDto = z.infer<typeof createProductSchema>