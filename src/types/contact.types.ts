import type { z } from "zod";
import type { contactFormSchema } from "../utils/contact-schema";

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactApiResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
    };

export type ContactSubmissionState = "idle" | "submitting" | "success" | "error";
