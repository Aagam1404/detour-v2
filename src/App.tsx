import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/state/AuthState";
import { PrototypeProvider } from "@/state/PrototypeState";
import { Login } from "@/screens/auth/Login";
import { Signup } from "@/screens/auth/Signup";
import { Splash } from "@/screens/onboarding/Splash";
import { OnboardingOne } from "@/screens/onboarding/OnboardingOne";
import { OnboardingTwo } from "@/screens/onboarding/OnboardingTwo";
import { OnboardingThree } from "@/screens/onboarding/OnboardingThree";
import { CommuteDetours, CommuteSetup } from "@/screens/commute/Commute";
import { Home } from "@/screens/home/Home";
import { DetourDetail } from "@/screens/detour/DetourDetail";
import { BennyGuide } from "@/screens/detour/BennyGuide";
import { Prizes } from "@/screens/detour/Prizes";
import { BackToCommute } from "@/screens/detour/BackToCommute";
import { Stamps } from "@/screens/wallet/Stamps";
import { Rewards } from "@/screens/wallet/Rewards";
import { Profile } from "@/screens/wallet/Profile";

/** Screens anyone can open. The splash comes first, then log in. */
const PUBLIC_PATHS = new Set(["/", "/login", "/signup"]);

function AuthGate({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user && !PUBLIC_PATHS.has(location.pathname)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <PrototypeProvider>
        <BrowserRouter>
          <AuthGate>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/onboarding/1" element={<OnboardingOne />} />
              <Route path="/onboarding/2" element={<OnboardingTwo />} />
              <Route path="/onboarding/3" element={<OnboardingThree />} />
              <Route path="/commute" element={<CommuteSetup />} />
              <Route path="/commute/detours" element={<CommuteDetours />} />
              <Route path="/home" element={<Home />} />
              <Route path="/detour/:detourId" element={<DetourDetail />} />
              <Route path="/detour/:detourId/guide" element={<BennyGuide />} />
              <Route path="/detour/:detourId/prizes" element={<Prizes />} />
              <Route path="/back-to-commute" element={<BackToCommute />} />
              <Route path="/stickers" element={<Stamps />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/me" element={<Profile />} />
            </Routes>
          </AuthGate>
        </BrowserRouter>
      </PrototypeProvider>
    </AuthProvider>
  );
}
