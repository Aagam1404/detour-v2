import type { ReactNode } from "react";

type CardProps = {
  variant?: "default" | "highlight" | "reward" | "story";
  children: ReactNode;
  className?: string;
};

export function Card({ variant = "default", children, className }: CardProps) {
  const classes = ["card", `card--${variant}`, className].filter(Boolean).join(" ");
  return <article className={classes}>{children}</article>;
}
