import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { CoinIcon } from "@/components/ui/CoinPill";
import { buildDeck, stampMeta, type Prize } from "@/data/wallet";
import { usePrototype } from "@/state/PrototypeState";
import { useActiveDetour } from "@/state/useActiveDetour";

const PICKS = 3;

export function Prizes() {
  const navigate = useNavigate();
  const detour = useActiveDetour();
  const { claimPrizes } = usePrototype();
  const [deck] = useState<Prize[]>(() => buildDeck());
  const [picked, setPicked] = useState<number[]>([]);
  const [showRest, setShowRest] = useState(false);
  const claimed = useRef(false);
  const done = picked.length === PICKS;
  const won = picked.map((index) => deck[index]);
  const earnedCoins = won.reduce((sum, prize) => sum + (prize.kind === "coins" ? prize.amount : 0), 0);
  const stampName = stampMeta(detour.id)?.name;

  useEffect(() => {
    if (!done || claimed.current) return;
    claimed.current = true;
    claimPrizes(detour.id, won);
    const timer = window.setTimeout(() => setShowRest(true), 900);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const left = PICKS - picked.length;

  return (
    <AppScreen>
      <div className="prizes">
        <header className="prizes__head">
          <p className="guide__eyebrow">{done ? "All picked" : "Stamp collected"}</p>
          <h1>{done ? "Your prizes" : "Pick 3 of 9."}</h1>
          <p>
            {done
              ? "Coins are for spending. Your stamp is already safe."
              : "Some cards hide coins. Some are just bad luck. Coins buy rewards."}
          </p>
          <div className="prizes__picks" role="status" aria-live="polite">
            {Array.from({ length: PICKS }, (_, index) => (
              <span key={index} className={index < picked.length ? "prizes__dot prizes__dot--used" : "prizes__dot"} />
            ))}
            <span className="prizes__left">{done ? "Done" : `${left} ${left === 1 ? "pick" : "picks"} left`}</span>
          </div>
        </header>

        <div className="prizes__grid">
          {deck.map((prize, index) => {
            const chosen = picked.includes(index);
            const open = chosen || (done && showRest);
            const label = open
              ? prize.kind === "coins"
                ? `${prize.amount} coins`
                : `Bad luck, try again`
              : `Mystery card ${index + 1}`;
            return (
              <button
                key={prize.id}
                type="button"
                className={[
                  "prize",
                  open ? "prize--open" : "",
                  open && !chosen ? "prize--missed" : "",
                  prize.kind === "miss" ? "prize--miss" : "prize--coins",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={open || done}
                aria-label={label}
                onClick={() => setPicked((current) => (current.length < PICKS ? [...current, index] : current))}
              >
                <span className="prize__inner">
                  <span className="prize__back" aria-hidden="true">
                    ?
                  </span>
                  <span className="prize__front">
                    {prize.kind === "coins" ? (
                      <>
                        <CoinIcon size={30} />
                        <strong>+{prize.amount}</strong>
                      </>
                    ) : (
                      <>
                        <span className="prize__miss" aria-hidden="true">
                          ✕
                        </span>
                        <strong>{prize.line}</strong>
                        <small>Try again</small>
                      </>
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {done ? (
          <section className="prizes__summary" aria-label="What you won">
            {earnedCoins > 0 ? (
              <p className="prizes__line">
                <CoinIcon size={22} /> <strong>+{earnedCoins} coins</strong> added to your wallet
              </p>
            ) : (
              <p className="prizes__line">
                <strong>Bad luck. No coins this time.</strong>
              </p>
            )}
            <p className="prizes__line prizes__line--stamp">Stamp kept: {stampName}</p>
            <Button onClick={() => navigate("/rewards")}>See my rewards</Button>
            <Button variant="secondary" onClick={() => navigate("/back-to-commute")}>
              Back to my route
            </Button>
          </section>
        ) : null}
      </div>
    </AppScreen>
  );
}
