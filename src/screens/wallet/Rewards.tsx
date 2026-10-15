import { useState } from "react";
import { Link } from "react-router-dom";
import { Coffee, CreditCard, Gift } from "lucide-react";
import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { CoinIcon } from "@/components/ui/CoinPill";
import { Header } from "@/components/layout/Header";
import { detourStamps } from "@/data/stamps";
import { offers, stampMeta, TOTAL_STAMPS, type Offer } from "@/data/wallet";
import { usePrototype } from "@/state/PrototypeState";

const kindIcon = { opal: CreditCard, coffee: Coffee, gift: Gift } as const;

export function Rewards() {
  const { coins, stampIds, history, tickets, redeem } = usePrototype();
  const [confirming, setConfirming] = useState<Offer | null>(null);
  const [justRedeemed, setJustRedeemed] = useState<{ offer: Offer; code: string } | null>(null);
  const empty = coins === 0 && history.length === 0;

  const confirm = () => {
    if (!confirming) return;
    const code = redeem(confirming);
    if (code) setJustRedeemed({ offer: confirming, code });
    setConfirming(null);
  };

  return (
    <AppScreen nav>
      <div className="rewards">
        <Header title="Rewards" subtitle="Coins you earn from detours. Spend them, or save up." />

        <section className="balance" aria-label="Coin balance">
          <CoinIcon size={44} />
          <div>
            <p className="balance__amount">{coins}</p>
            <p className="balance__label">{coins === 1 ? "coin" : "coins"} to spend</p>
          </div>
        </section>

        {empty ? (
          <p className="rewards__empty">
            No coins yet. Finish a detour, then pick 3 of 9 cards. Some are bad luck.
          </p>
        ) : null}

        {justRedeemed ? (
          <section className="ticket ticket--new" role="status">
            <p className="ticket__eyebrow">Ready to use</p>
            <h2>{justRedeemed.offer.title}</h2>
            <p>{justRedeemed.offer.place}</p>
            <p className="ticket__code">{justRedeemed.code}</p>
            <p className="ticket__note">Show this code at the counter.</p>
          </section>
        ) : null}

        <section className="rewards__section" aria-label="Spend your coins">
          <h2 className="rewards__h">Spend your coins</h2>
          <ul className="offers">
            {offers.map((offer) => {
              const canAfford = coins >= offer.cost;
              const short = offer.cost - coins;
              const Icon = kindIcon[offer.kind];
              return (
                <li key={offer.id} className="offer">
                  <span className={`offer__kind offer__kind--${offer.tone}`} aria-hidden="true">
                    <Icon size={26} strokeWidth={2.25} />
                  </span>
                  <div className="offer__text">
                    <h3>{offer.title}</h3>
                    <p>{offer.place}</p>
                    <span className="offer__bar" aria-hidden="true">
                      <i style={{ width: `${Math.min(100, (coins / offer.cost) * 100)}%` }} />
                    </span>
                  </div>
                  <button
                    type="button"
                    className={canAfford ? "offer__buy offer__buy--ready" : "offer__buy"}
                    disabled={!canAfford}
                    aria-label={canAfford ? `Redeem ${offer.title} for ${offer.cost} coins` : `${offer.title}, ${short} more coins needed`}
                    onClick={() => setConfirming(offer)}
                  >
                    <CoinIcon size={16} />
                    <span>{canAfford ? offer.cost : `${short} more`}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {tickets.length > 0 ? (
          <section className="rewards__section" aria-label="Your tickets">
            <h2 className="rewards__h">Your tickets</h2>
            <ul className="tickets">
              {tickets.map((ticket) => {
                const offer = offers.find((item) => item.id === ticket.offerId);
                return (
                  <li key={ticket.code}>
                    <span>{offer?.title}</span>
                    <strong>{ticket.code}</strong>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <section className="rewards__section" aria-label="Your stamps">
          <div className="rewards__row">
            <h2 className="rewards__h">Stamps</h2>
            <Link to="/stickers" className="rewards__link">
              {stampIds.length} of {TOTAL_STAMPS} →
            </Link>
          </div>
          <ul className="stamp-strip">
            {stampIds.length === 0 ? (
              <li className="stamp-strip__empty">Stamps are keepsakes. Finish a detour and you get one.</li>
            ) : (
              stampIds.map((id) => (
                <li key={id}>
                  <img src={detourStamps[id]} alt={stampMeta(id)?.name ?? id} />
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      {confirming ? (
        <div className="sheet" role="dialog" aria-label="Confirm redeem">
          <div className="sheet__panel">
            <h2>Spend {confirming.cost} coins?</h2>
            <p>
              {confirming.title}. You’ll have {coins - confirming.cost} left.
            </p>
            <Button onClick={confirm}>Yes, redeem</Button>
            <Button variant="secondary" onClick={() => setConfirming(null)}>
              Not now
            </Button>
          </div>
        </div>
      ) : null}
    </AppScreen>
  );
}
