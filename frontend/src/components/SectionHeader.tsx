import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HighlightText } from "@/components/ui/HighlightText";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  subtitleVariant?: "default" | "badge";
  description?: string;
  align?: "left" | "center";
  titleClassName?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  subtitleVariant = "default",
  align = "center",
  titleClassName,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
  {/* Subtitle */}
  {subtitle && (
    subtitleVariant === "badge" ? (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6",
          align === "center" && "mx-auto"
        )}
      >
        <span className="text-sm font-medium text-saffron">
          {subtitle}
        </span>
      </div>
    ) : (
      <p className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
        {subtitle}
      </p>
    )
  )}

      {/* Title with Highlight Support */}
      <h2
        className={cn(
          "font-display text-3xl md:text-4xl lg:text-5xl font-bold",
          titleClassName || "text-foreground"
        )}
      >
        <HighlightText text={title} />
      </h2>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "mt-4 text-muted-foreground text-lg max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}

      {/* Extra content */}
      {children}
    </div>
  );
}
