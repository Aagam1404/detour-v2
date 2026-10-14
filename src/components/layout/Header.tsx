import type { ReactNode } from "react";

type HeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: ReactNode;
};

export function Header({ title, subtitle, eyebrow, action }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        {eyebrow ? <p className="app-header__eyebrow">{eyebrow}</p> : null}
        <h1 className="app-header__title">{title}</h1>
        {subtitle ? <p className="app-header__subtitle">{subtitle}</p> : null}
      </div>
      {action}
    </header>
  );
}
