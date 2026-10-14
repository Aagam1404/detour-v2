import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SplashArt } from "@/components/brand/SplashArt";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { useAuth } from "@/state/AuthState";

/** Timings in ms. They match the CSS animation delays in styles/splash.css. */
const HOLD_MS = 3600;
const FADE_MS = 350;
const REDUCED_HOLD_MS = 1200;

export function Splash() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);
  const next = user ? "/onboarding/1" : "/login";

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? REDUCED_HOLD_MS : HOLD_MS;
    const fade = window.setTimeout(() => setLeaving(true), hold);
    const go = window.setTimeout(() => {
      if (!done.current) {
        done.current = true;
        navigate(next, { replace: true });
      }
    }, hold + FADE_MS);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(go);
    };
  }, [navigate, next]);

  const skip = () => {
    if (done.current) return;
    done.current = true;
    navigate(next, { replace: true });
  };

  return (
    <ScreenShell padded={false} className="screen-shell--splash">
      <div className={leaving ? "splash splash--leaving" : "splash"} onClick={skip}>
        <div className="splash__art" aria-hidden="true">
          <SplashArt />
        </div>
        <h1 className="splash__wordmark">DETOUR</h1>
      </div>
    </ScreenShell>
  );
}
