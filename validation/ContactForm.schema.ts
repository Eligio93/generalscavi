import * as z from "zod";

export const ContactFormSchema = z.object({
  name: z.string().trim().min(1, "Il nome è obbligatorio"),
  lastName: z.string().trim().min(1, "Il cognome è obbligatorio"),
  email: z.email("Inserisci un'email valida").trim(),
  message: z.string().min(1, "Il messaggio è obbligatorio").trim(),
});
