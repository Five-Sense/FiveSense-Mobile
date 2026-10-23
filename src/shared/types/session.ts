import { z } from 'zod';

export const sessionSchema = z.object({
  userId: z.uuid(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string(),
  role: z.literal('VIEWER'),
});

export type Session = z.infer<typeof sessionSchema>;
