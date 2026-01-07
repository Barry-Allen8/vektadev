import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Imię musi zawierać co najmniej 2 znaki"),
  email: z.string().email("Nieprawidłowy format email"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Wiadomość musi zawierać co najmniej 10 znaków"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
