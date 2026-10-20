import { z } from "zod";
export const bookingSchema = z.object({
  service: z.string().min(1).max(80),
  professional: z.uuid(),
  date: z.iso.date(),
  slot: z.iso.datetime({ offset: true }),
  name: z.string().trim().min(3).max(120),
  email: z.email().max(254),
  phone: z.string().regex(/^[+\d\s()-]{10,22}$/),
  website: z.string().max(0).optional(),
});
