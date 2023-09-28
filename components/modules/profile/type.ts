import { z } from 'zod';
import { profileSchema } from './schema';

export type ProfileFormValues = z.infer<typeof profileSchema>
