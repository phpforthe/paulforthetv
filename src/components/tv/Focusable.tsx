import {
  forwardRef,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  initialFocus?: boolean;
  pop?: "none" | "sm" | "lg";
};

export const Focusable = forwardRef<HTMLButtonElement, Props>(
  function Focusable(
    {
      className,
      initialFocus = false,
      pop = "sm",
      onKeyDown,
      onClick,
      disabled = false,
      ...props
    },
    ref,
  ) {
    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (
        !disabled &&
        (event.key === "Enter" ||
          event.key === "NumpadEnter" ||
          event.key === " ")
      ) {
        event.preventDefault();
        event.stopPropagation();

        // O navegador já dispara onClick para Enter em um button nativo.
        // Para Space, o click também é gerado ao soltar a tecla. Não
        // chamamos onClick manualmente para evitar duplo disparo.
      }

      onKeyDown?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        data-tv-focusable=""
        {...(initialFocus ? { "data-tv-autofocus": "true" } : {})}
        {...props}
        onKeyDown={handleKeyDown}
        onClick={onClick}
        className={cn(
          "tv-focusable tv-focus-ring text-left outline-none",
          pop === "lg" && "tv-pop",
          pop === "sm" && "tv-pop-sm",
          disabled && "cursor-not-allowed opacity-60",
          className,
        )}
      />
    );
  },
);

Focusable.displayName = "Focusable";
