import { useNavigate } from "react-router-dom";
import { OnboardingScreen } from "@/components/layout/OnboardingScreen";

export function OnboardingTwo() {
  const navigate = useNavigate();

  return (
    <OnboardingScreen
      step={2}
      title="But what if you stepped off that path?"
      titleTone="orange"
      onNext={() => navigate("/onboarding/3")}
    >
      A tiny detour could lead you to a hidden doorway, a strange carving, a quiet lane, or even a
      seal by the water. Nothing big. Just one small thing you would have missed otherwise.
    </OnboardingScreen>
  );
}
