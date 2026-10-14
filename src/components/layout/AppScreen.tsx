import type { ReactNode } from "react";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { BottomNav } from "@/components/layout/BottomNav";

type AppScreenProps = {
  children: ReactNode;
  nav?: boolean;
};

export function AppScreen({ children, nav = false }: AppScreenProps) {
  return (
    <ScreenShell padded={false} withBottomNav={nav}>
      <div className={nav ? "app-screen app-screen--nav" : "app-screen"}>{children}</div>
      {nav ? <BottomNav /> : null}
    </ScreenShell>
  );
}
