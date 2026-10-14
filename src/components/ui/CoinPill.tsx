import { Link } from "react-router-dom";
import coinUrl from "@/assets/icons/coin.png";
import { usePrototype } from "@/state/PrototypeState";

export function CoinIcon({ size = 20 }: { size?: number }) {
  return <img className="coin-icon" src={coinUrl} alt="" width={size} height={size} />;
}

export function CoinPill({ floating = false }: { floating?: boolean }) {
  const { coins } = usePrototype();
  return (
    <Link
      to="/rewards"
      className={floating ? "coin-pill coin-pill--floating" : "coin-pill"}
      aria-label={`${coins} coins. Open rewards`}
    >
      <CoinIcon size={20} />
      <span>{coins}</span>
    </Link>
  );
}
