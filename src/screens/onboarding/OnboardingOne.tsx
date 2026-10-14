import { useNavigate } from "react-router-dom";
import { OnboardingScreen } from "@/components/layout/OnboardingScreen";

export function OnboardingOne() {
  const navigate = useNavigate();

  return (
    <OnboardingScreen
      step={1}
      title="You move to a new city"
      titleTone="blue"
      onNext={() => navigate("/onboarding/2")}
    >
      At first, everything feels new. Then a few weeks pass. You learn the same train, the same
      exit, the same walk to class. And suddenly, the city gets smaller.
    </OnboardingScreen>
  );
}
