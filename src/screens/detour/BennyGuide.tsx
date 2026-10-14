import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { CoinIcon } from "@/components/ui/CoinPill";
import { Chip } from "@/components/ui/Chip";
import { StepMap } from "@/components/map/StepMap";
import { getJourney } from "@/data/journeys";
import { detourStamps } from "@/data/stamps";
import { stampMeta } from "@/data/wallet";
import { usePrototype } from "@/state/PrototypeState";
import { useActiveDetour } from "@/state/useActiveDetour";

export function BennyAccept() {
  const navigate = useNavigate();
  const detour = useActiveDetour();
  const journey = getJourney(detour.id);

  return (
    <AppScreen>
      <div className="guide guide--accept">
        <div className="accept__cards" aria-hidden="true">
          <span className="accept__card accept__card--a">?</span>
          <span className="accept__card accept__card--b">?</span>
          <span className="accept__card accept__card--c">?</span>
        </div>
        <div className="guide__copy">
          <p className="guide__eyebrow">Off your route</p>
          <h1>Take a small detour.</h1>
          <p>{journey.teaser}</p>
        </div>
        <div className="accept__chips">
          <Chip variant="active">+{journey.extraMinutes} min</Chip>
          <Chip>{journey.distanceMeters} m</Chip>
          <Chip>
            <CoinIcon size={16} />
            &nbsp;pick 3 cards
          </Chip>
        </div>
        <p className="accept__note">You’ll still make your train.</p>
        <div className="guide__actions">
          <Button onClick={() => navigate(`/detour/${journey.id}/guide`)}>Accept this detour →</Button>
          <Button variant="ghost" onClick={() => navigate("/home")}>
            Maybe next time
          </Button>
        </div>
      </div>
    </AppScreen>
  );
}

function DetourBar({ journey, index, total }: { journey: ReturnType<typeof getJourney>; index: number; total: number }) {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const left = Math.max(1, Math.round(journey.extraMinutes * (1 - index / total)));
  return (
    <>
      <div className="detour-bar">
        <button type="button" className="detour-bar__close" aria-label="Leave this detour" onClick={() => setConfirm(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 3 L13 13 M13 3 L3 13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
        <ol className="detour-bar__track" aria-label={`Step ${Math.min(index + 1, total)} of ${total}`}>
          {Array.from({ length: total }, (_, i) => (
            <li key={i} className={i < index ? "is-done" : i === index ? "is-now" : undefined} />
          ))}
        </ol>
        <span className="detour-bar__time">~{left} min left</span>
      </div>
      {confirm ? (
        <div className="sheet" role="dialog" aria-label="Leave this detour">
          <div className="sheet__panel">
            <h2>Changed your mind? Fair.</h2>
            <p>Your route is right where you left it. You can come back to this one later.</p>
            <Button onClick={() => setConfirm(false)}>Keep going</Button>
            <Button variant="secondary" onClick={() => navigate("/home")}>
              Back to my route
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function BennyGuide() {
  const navigate = useNavigate();
  const detour = useActiveDetour();
  const journey = getJourney(detour.id);
  const { completeDetour } = usePrototype();
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"steps" | "who" | "reveal">("steps");
  const [hintOpen, setHintOpen] = useState(false);
  const [ctaReady, setCtaReady] = useState(true);
  const [misses, setMisses] = useState(0);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const total = journey.steps.length + 1;

  useEffect(() => {
    if (phase === "reveal") completeDetour(journey.id);
  }, [phase, journey.id, completeDetour]);

  useEffect(() => {
    setStep(0);
    setPhase("steps");
    setHintOpen(false);
    setMisses(0);
    setWrongId(null);
  }, [journey.id]);

  useEffect(() => {
    if (phase !== "steps" || step !== journey.steps.length - 1) {
      setCtaReady(true);
      setHintOpen(false);
      return;
    }
    setHintOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCtaReady(true);
      return;
    }
    setCtaReady(false);
    const timer = window.setTimeout(() => setCtaReady(true), 2000);
    return () => window.clearTimeout(timer);
  }, [journey.steps.length, phase, step]);

  const current = journey.steps[step];
  const quiet = current?.path === "none";
  const lead = quiet ? splitLead(current.body) : null;
  const upcoming = journey.steps[step + 1];
  const next = quiet || !upcoming ? null : upcoming.path === "none" ? "Next: stop and look around." : `Next: ${upcoming.heading}`;

  const advance = () => {
    if (step < journey.steps.length - 1) setStep((value) => value + 1);
    else setPhase("who");
  };

  if (phase === "who") {
    return (
      <AppScreen>
        <div className="guide guide--who">
          <DetourBar journey={journey} index={total - 1} total={total} />
          <div className="guide__copy">
            <p className="guide__eyebrow">Last one</p>
            <h1>{journey.recognition.heading}</h1>
          </div>
          <div className="guide__options">
            {journey.recognition.choices.map((choice, index) => (
              <button
                key={choice.id}
                type="button"
                className={wrongId === choice.id ? "option option--wrong" : "option"}
                onClick={() => {
                  if (choice.id === journey.recognition.correctChoiceId) {
                    setPhase("reveal");
                  } else {
                    setWrongId(choice.id);
                    setMisses((value) => value + 1);
                  }
                }}
              >
                <span className="option__letter" aria-hidden="true">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{choice.label}</span>
              </button>
            ))}
          </div>
          {misses > 0 ? (
            <p className="guide__miss" role="status">
              {misses > 1 ? "Still not it. Take another look." : "Not that one. Look again."}
            </p>
          ) : null}
          {misses > 1 ? (
            <Button variant="ghost" onClick={() => navigate("/home")}>
              Can’t find it? Back to my route
            </Button>
          ) : null}
        </div>
      </AppScreen>
    );
  }

  if (phase === "reveal") {
    return (
      <AppScreen>
        <div className="guide guide--reveal">
          <div className="guide__copy">
            <p className="guide__eyebrow">{journey.reveal.eyebrow}</p>
            <h1>{journey.reveal.heading}</h1>
            {journey.reveal.subtitle !== journey.location ? <p>{journey.reveal.subtitle}</p> : null}
            <p>{journey.reveal.story}</p>
          </div>
          <div className="reveal__art">
            <img className="guide__stamp" src={detourStamps[journey.id]} alt="" />
            <p className="guide__name">{journey.name}</p>
            <p className="guide__place">{journey.location}</p>
            <p className="reveal__badge">Stamp collected: {stampMeta(journey.id)?.name ?? journey.name}</p>
          </div>
          <p className="guide__after">{journey.reveal.supportingCopy}</p>
          <div className="guide__actions">
            <Button onClick={() => navigate(`/detour/${journey.id}/prizes`)}>Now pick your coins →</Button>
          </div>
        </div>
      </AppScreen>
    );
  }

  if (!current) return null;

  return (
    <AppScreen>
      <div className={quiet ? "guide guide--quiet" : "guide"}>
        <DetourBar journey={journey} index={step} total={total} />
        <div className="guide__stage">
          {current.path === "none" ? <QuietEye /> : <StepMap key={`${journey.id}-${step}`} type={current.path} goal={current.goal} meters={stepMeters(journey.distanceMeters, step)} />}
        </div>
        <div className="guide__copy">
          <p className="guide__eyebrow">Step {step + 1} of {journey.steps.length}</p>
          <h1>{current.heading}</h1>
          {lead ? <p className="guide__loud">{lead.loud}</p> : <p>{current.body}</p>}
          {lead?.rest ? <p>{lead.rest}</p> : null}
          {current.emphasis ? <p className="guide__emphasis">{current.emphasis}</p> : null}
          {next ? <p className="guide__next">{next}</p> : null}
        </div>
        <div className="guide__actions">
          {hintOpen && current.hint ? (
            <p className="guide__hint hint-card" role="status">
              {current.hint}
            </p>
          ) : null}
          {ctaReady ? <Button onClick={advance}>{current.cta}</Button> : <div className="guide__wait" aria-hidden="true" />}
          {current.hint && !hintOpen ? (
            <Button variant="ghost" onClick={() => setHintOpen(true)}>
              {quiet ? "One last clue" : "Give me a hint"}
            </Button>
          ) : null}
        </div>
      </div>
    </AppScreen>
  );
}

/** Rough split of the walk across the three directional steps. */
function stepMeters(total: number, step: number) {
  const share = [0.25, 0.4, 0.35][step];
  return share ? Math.round((total * share) / 5) * 5 : undefined;
}

function splitLead(body: string) {
  const match = body.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  if (!match) return { loud: body, rest: "" };
  return { loud: match[1], rest: match[2] };
}

function QuietEye() {
  return (
    <svg className="guide__eye" viewBox="0 0 72 44" aria-hidden="true">
      <path d="M4 22 Q36 4 68 22 Q36 40 4 22 Z" />
      <circle cx="36" cy="22" r="6" />
    </svg>
  );
}
