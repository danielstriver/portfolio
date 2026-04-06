import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { type FormEvent, useEffect } from "react";
import { useContactForm } from "../hooks/useContactForm";
import { PERSONAL_INFO } from "../constants";
import { Toast } from "./Toast";

const inputClassName =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary";

export const Contact = () => {
  const {
    values,
    fieldErrors,
    status,
    feedbackMessage,
    isSubmitting,
    isSuccess,
    isError,
    updateField,
    submit,
    clearFeedback,
  } = useContactForm();

  useEffect(() => {
    if (status === "idle") {
      return;
    }

    const timeout = window.setTimeout(() => {
      if (status === "success" || status === "error") {
        clearFeedback();
      }
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, [clearFeedback, status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <>
      <section id="contact" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Get in Touch</h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="mb-6 text-2xl font-bold">Let's connect</h3>
              <p className="max-w-md leading-relaxed text-muted-foreground">
                Whether you want to collaborate, discuss an opportunity, or ask a technical question,
                this form will send your message directly to my inbox.
              </p>

              <div className="space-y-6">
                <div className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] group-hover:border-primary/30">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Email</p>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-lg hover:text-primary">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] group-hover:border-primary/30">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Phone</p>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-lg hover:text-primary">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] group-hover:border-primary/30">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Address</p>
                    <p className="text-lg text-muted-foreground">{PERSONAL_INFO.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 backdrop-blur-xl"
            >
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.company}
                    onChange={(event) => updateField("company", event.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      className={inputClassName}
                      placeholder="John Doe"
                      aria-invalid={Boolean(fieldErrors.name?.length)}
                      aria-describedby={fieldErrors.name?.length ? "name-error" : undefined}
                    />
                    {fieldErrors.name?.length ? (
                      <p id="name-error" className="text-sm text-rose-500">
                        {fieldErrors.name[0]}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className={inputClassName}
                      placeholder="john@example.com"
                      aria-invalid={Boolean(fieldErrors.email?.length)}
                      aria-describedby={fieldErrors.email?.length ? "email-error" : undefined}
                    />
                    {fieldErrors.email?.length ? (
                      <p id="email-error" className="text-sm text-rose-500">
                        {fieldErrors.email[0]}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    className={`${inputClassName} resize-none`}
                    placeholder="Share a few details about your project, role, or question."
                    aria-invalid={Boolean(fieldErrors.message?.length)}
                    aria-describedby={fieldErrors.message?.length ? "message-error" : undefined}
                  />
                  {fieldErrors.message?.length ? (
                    <p id="message-error" className="text-sm text-rose-500">
                      {fieldErrors.message[0]}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                      Sending message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>

                <p
                  className={`text-sm ${
                    isError ? "text-rose-500" : isSuccess ? "text-emerald-500" : "text-muted-foreground"
                  }`}
                >
                  {feedbackMessage || "Responses are validated, spam-protected, and routed through Resend."}
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Toast
        visible={Boolean(feedbackMessage && (isSuccess || isError))}
        tone={isSuccess ? "success" : "error"}
        message={feedbackMessage}
      />
    </>
  );
};
