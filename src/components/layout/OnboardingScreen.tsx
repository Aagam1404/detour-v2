import type { ReactNode } from "react";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { RouteGraphic } from "@/components/map/RouteGraphic";
import dotsOne from "@/assets/illustrations/dots-1.svg";
import dotsTwo from "@/assets/illustrations/dots-2.svg";
import dotsThree from "@/assets/illustrations/dots-3.svg";
import arrowButton from "@/assets/illustrations/arrow-button.svg";

const dots = {
  1: dotsOne,
  2: dotsTwo,
  3: dotsThree,
} as const;

type OnboardingScreenProps = {
  step: 1 | 2 | 3;
  title: string;
  titleTone: "blue" | "orange" | "gold";
  children: ReactNode;
  onNext: () => void;
  cta?: string;
};

export function OnboardingScreen({
  step,
  title,
  titleTone,
  children,
  onNext,
  cta,
}: OnboardingScreenProps) {
  return (
    <ScreenShell padded={false}>
      <section className="onboarding">
        <div className="onboarding__art" aria-hidden="true">
          <RouteGraphic variant={`onboarding-${step}`} />
        </div>
        <div className="onboarding__lead" />
        <div className="onboarding__panel">
          <div className="onboarding__copy">
            <h1 className={`onboarding__title onboarding__title--${titleTone}`}>{title}</h1>
            <p className="onboarding__body">{children}</p>
          </div>
          <div className="onboarding__footer">
            <div className="onboarding-dots" role="group" aria-label={`Step ${step} of 3`}>
              <img
                className={
                  step === 3
                    ? "onboarding-dots__image onboarding-dots__image--flip"
                    : "onboarding-dots__image"
                }
                src={dots[step]}
                alt=""
                width={52}
                height={12}
              />
            </div>
            {cta ? (
              <button type="button" className="onboarding-cta" onClick={onNext}>
                {cta}
              </button>
            ) : (
              <button type="button" className="onboarding-next" onClick={onNext} aria-label="Next">
                <img
                  className="onboarding-next__image"
                  src={arrowButton}
                  alt=""
                  width={60}
                  height={64}
                />
              </button>
            )}
          </div>
        </div>
      </section>
    </ScreenShell>
  );
}
