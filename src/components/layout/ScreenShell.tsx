import type { ReactNode } from "react";

type ScreenShellProps = {
  children?: ReactNode;
  withBottomNav?: boolean;
  padded?: boolean;
  className?: string;
};

export function ScreenShell({
  children,
  withBottomNav = false,
  padded = true,
  className,
}: ScreenShellProps) {
  const shellClass = [
    "screen-shell",
    withBottomNav ? "screen-shell--nav" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!padded) {
    return <div className={shellClass}>{children}</div>;
  }

  return (
    <div className={shellClass}>
      <div className="screen-content">{children}</div>
    </div>
  );
}
