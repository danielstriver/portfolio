import { useCallback, useState } from "react";
import type {
  ContactApiResponse,
  ContactFormValues,
  ContactSubmissionState,
} from "../types/contact.types";
import { contactFormSchema, emptyContactForm } from "../utils/contact-schema";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong. Please try again.";

export const useContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormValues, string[]>>
  >({});
  const [status, setStatus] = useState<ContactSubmissionState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const updateField = useCallback((field: keyof ContactFormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setFieldErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }, []);

  const resetForm = useCallback(() => {
    setValues(emptyContactForm);
    setFieldErrors({});
  }, []);

  const clearFeedback = useCallback(() => {
    setStatus("idle");
    setFeedbackMessage("");
  }, []);

  const submit = useCallback(async () => {
    const validationResult = contactFormSchema.safeParse(values);

    if (!validationResult.success) {
      setStatus("error");
      setFieldErrors(validationResult.error.flatten().fieldErrors);
      setFeedbackMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setFieldErrors({});
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationResult.data),
      });

      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok || !result.success) {
        setStatus("error");
        setFieldErrors(result.success ? {} : result.fieldErrors ?? {});
        setFeedbackMessage(result.message);
        return;
      }

      setStatus("success");
      setFeedbackMessage(result.message);
      resetForm();
    } catch (error) {
      setStatus("error");
      setFeedbackMessage(getErrorMessage(error));
    }
  }, [resetForm, values]);

  return {
    values,
    fieldErrors,
    status,
    feedbackMessage,
    isSubmitting: status === "submitting",
    isSuccess: status === "success",
    isError: status === "error",
    updateField,
    submit,
    clearFeedback,
  };
};
