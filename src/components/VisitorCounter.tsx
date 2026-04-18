import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // We switch to counterapi.dev which is currently more reliable than countapi.xyz
    const namespace = "daniel-niyomugenga-portfolio";
    const key = "visits";

    const fetchCount = async () => {
      const alreadyCounted = sessionStorage.getItem("visit_counted");
      const cachedCount = sessionStorage.getItem("visit_count_value");

      if (alreadyCounted && cachedCount !== null) {
        setCount(parseInt(cachedCount, 10));
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(
          `https://api.counterapi.dev/v1/${namespace}/${key}/up`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("API failed");

        const data = await response.json();
        if (data && typeof data.count === "number") {
          sessionStorage.setItem("visit_counted", "1");
          sessionStorage.setItem("visit_count_value", String(data.count));
          setCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        setCount(null);
      }
    };

    fetchCount();
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm shadow-sm hover:border-primary/40 transition-all group">
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
        <Eye size={14} />
      </div>
      <div className="flex flex-col items-start leading-none gap-1">
        <span className="text-[10px] uppercase tracking-widest text-primary/70 font-bold">{t("footer.visits") as string}</span>
        <span className="text-foreground font-bold tabular-nums">
          {count.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
