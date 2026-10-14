import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  variant?: "default" | "active" | "filled" | "muted";
};

export function Chip({ children, variant = "default" }: ChipProps) {
  return <span className={`chip chip--${variant}`}>{children}</span>;
}
