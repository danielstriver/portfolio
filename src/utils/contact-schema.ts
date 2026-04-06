import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(20, "Please share a bit more detail in your message.")
    .max(2000, "Message is too long."),
  company: z.string().max(0).optional().default(""),
});

export const emptyContactForm = {
  name: "",
  email: "",
  message: "",
  company: "",
} satisfies z.input<typeof contactFormSchema>;
