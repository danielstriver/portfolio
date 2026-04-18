import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

type ToastProps = {
  message: string;
  tone: "success" | "error";
  visible: boolean;
  onDismiss?: () => void;
};

export const Toast = ({ message, tone, visible, onDismiss }: ToastProps) => {
  const isSuccess = tone === "success";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-6 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card-strong)] px-4 py-3 text-sm text-foreground shadow-[var(--shadow)] backdrop-blur-xl"
          role="status"
          aria-live="polite"
        >
          {isSuccess ? (
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={18} />
          ) : (
            <AlertCircle className="mt-0.5 shrink-0 text-rose-500" size={18} />
          )}
          <span className="flex-1 leading-relaxed">{message}</span>
          {onDismiss && (
            <button
              onClick={onDismiss}
              aria-label="Dismiss"
              className="ml-1 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-[var(--surface)] hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
