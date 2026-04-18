import { Mail } from "lucide-react";
import { COMMON_INFO } from "../constants";

const socialIcons: Record<string, string> = {
  GitHub: "github-icon",
  Instagram: "social-icon",
  LinkedIn: "social-icon",
};

type SocialLinksProps = {
  className?: string;
};

export const SocialLinks = ({ className = "" }: SocialLinksProps) => {
  const socials = COMMON_INFO.socials;

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`.trim()}>
      {socials.map((social) => {
        const iconId = socialIcons[social.name];

        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit Daniel on ${social.name}`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-muted-foreground backdrop-blur-md transition-all hover:border-primary/35 hover:text-primary"
          >
            {iconId ? (
              <svg className="h-4 w-4 shrink-0" aria-hidden="true">
                <use href={`/icons.svg#${iconId}`} />
              </svg>
            ) : (
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            <span>{social.name}</span>
          </a>
        );
      })}
    </div>
  );
};
