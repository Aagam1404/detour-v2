import { useNavigate } from "react-router-dom";
import { OnboardingScreen } from "@/components/layout/OnboardingScreen";

export function OnboardingThree() {
  const navigate = useNavigate();

  return (
    <OnboardingScreen
      step={3}
      title="Then you do it again"
      titleTone="gold"
      cta="Set my commute →"
      onNext={() => navigate("/commute")}
    >
      One discovery becomes two. Two become ten. And slowly, the city stops feeling like a route
      you pass through. It starts feeling like a place you know. Every detour leaves you with a
      little sticker to remember it by.
    </OnboardingScreen>
  );
}
