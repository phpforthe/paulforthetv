import { useState, type ReactNode } from "react";
import { Focusable } from "./Focusable";
import { cn } from "@/lib/utils";

type PosterProps = {
  title: string;
  image?: string | undefined;
  subtitle?: string | undefined;
  badge?: string | undefined;
  wide?: boolean | undefined;
  initialFocus?: boolean | undefined;
  onSelect: () => void;
};

export function PosterCard({
  title,
  image,
  subtitle,
  badge,
  wide,
  initialFocus,
  onSelect,
}: PosterProps) {
  const [broken, setBroken] = useState(false);

  return (
    <Focusable
      pop="lg"
      initialFocus={initialFocus}
      onClick={onSelect}
      className={cn(
        "group relative shrink-0 overflow-hidden rounded-xl bg-card",
        wide ? "h-[9.5rem] w-64" : "h-[16.5rem] w-[11rem]",
      )}
      aria-label={title}
    >
      {image && !broken ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-elevated p-3 text-center text-sm font-medium text-muted-foreground">
          {title}
        </div>
      )}

      {badge && (
        <span className="absolute left-2 top-2 rounded-md bg-live px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
          {badge}
        </span>
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 p-2.5 pt-8"
        style={{ background: "var(--gradient-fade-bottom)" }}
      >
        <p className="line-clamp-2 text-xs font-semibold leading-tight">{title}</p>
        {subtitle && (
          <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </Focusable>
  );
}

export function CarouselRow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 px-1 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="scrollbar-none flex gap-4 overflow-x-auto px-1 py-4">
        {children}
      </div>
    </section>
  );
}
