import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCount = async () => {
      const alreadyCounted = sessionStorage.getItem("visit_counted");
      const cachedCount = sessionStorage.getItem("visit_count_value");

      if (alreadyCounted && cachedCount !== null) {
        setCount(parseInt(cachedCount, 10));
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const response = await fetch("/api/counter", {
          method: "POST",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("API failed");

        const data = await response.json();
        if (data && typeof data.count === "number") {
          sessionStorage.setItem("visit_counted", "1");
          sessionStorage.setItem("visit_count_value", String(data.count));
          setCount(data.count);
        }
      } catch {
        setCount(null);
      }
    };

    fetchCount();
  }, []);

  if (count === null) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="flex items-center gap-2.5 rounded-2xl border border-primary/20 bg-background/80 px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-lg backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-primary/10 group">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
          <Eye size={13} />
        </div>
        <div className="flex flex-col items-start leading-none gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-primary/60 font-bold">
            {t("footer.visits") as string}
          </span>
          <span className="text-foreground font-bold tabular-nums text-sm">
            {count.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
