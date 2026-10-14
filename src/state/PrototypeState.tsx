import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Commute } from "@/data/commute";
import { newCode, stampMeta, type Offer, type Prize } from "@/data/wallet";
import { useAuth } from "@/state/AuthState";

export type WalletItem = {
  id: string;
  label: string;
  coins?: number;
  stampId?: string;
  at: number;
};

export type Ticket = { offerId: string; code: string; at: number };

type Wallet = {
  coins: number;
  stampIds: string[];
  completedIds: string[];
  history: WalletItem[];
  tickets: Ticket[];
  last: { detourId: string; coins: number; stampIds: string[] } | null;
  commute: Commute | null;
};

const emptyWallet: Wallet = { coins: 0, stampIds: [], completedIds: [], history: [], tickets: [], last: null, commute: null };

function storageKey(username: string) {
  return `detour.wallet.${username.trim().toLowerCase()}`;
}

function loadWallet(username: string): Wallet {
  try {
    const raw = localStorage.getItem(storageKey(username));
    if (!raw) return emptyWallet;
    return { ...emptyWallet, ...(JSON.parse(raw) as Partial<Wallet>) };
  } catch {
    return emptyWallet;
  }
}

function saveWallet(username: string, wallet: Wallet) {
  try {
    localStorage.setItem(storageKey(username), JSON.stringify(wallet));
  } catch {
    /* storage can be blocked, the wallet then lives for this session only */
  }
}

type PrototypeState = {
  hintRevealed: boolean;
  clueRevealed: boolean;
  bennyDiscovered: boolean;
  bennyCollected: boolean;
  collectedIds: string[];
  lastCollectedId: string | null;
  skippedDetour: boolean;
  commute: Commute | null;
  coins: number;
  stampIds: string[];
  history: WalletItem[];
  tickets: Ticket[];
  lastClaim: Wallet["last"];
  setCommute: (commute: Commute) => void;
  revealHint: () => void;
  revealClue: () => void;
  discoverBenny: () => void;
  completeDetour: (detourId: string) => void;
  claimPrizes: (detourId: string, prizes: Prize[]) => void;
  redeem: (offer: Offer) => string | null;
  startDetour: () => void;
  skipDetour: () => void;
};

const PrototypeContext = createContext<PrototypeState | null>(null);

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const username = user?.username ?? "guest";
  const [hintRevealed, setHintRevealed] = useState(false);
  const [clueRevealed, setClueRevealed] = useState(false);
  const [bennyDiscovered, setBennyDiscovered] = useState(false);
  const [skippedDetour, setSkippedDetour] = useState(false);
  const [store, setStore] = useState<{ owner: string; wallet: Wallet }>(() => ({
    owner: username,
    wallet: loadWallet(username),
  }));

  // The wallet belongs to whoever is logged in. Switch it during render when that changes.
  let current = store;
  if (store.owner !== username) {
    current = { owner: username, wallet: loadWallet(username) };
    setStore(current);
  }
  const wallet = current.wallet;

  const update = useCallback(
    (change: (wallet: Wallet) => Wallet) => {
      setStore((prev) => {
        const base = prev.owner === username ? prev.wallet : loadWallet(username);
        const next = change(base);
        saveWallet(username, next);
        return { owner: username, wallet: next };
      });
    },
    [username],
  );

  // The stamp is a guaranteed reward for finishing the quest. It is not part of the card pick.
  const completeDetour = useCallback(
    (detourId: string) => {
      update((base) => {
        if (base.stampIds.includes(detourId)) {
          return base.completedIds.includes(detourId) ? base : { ...base, completedIds: [...base.completedIds, detourId] };
        }
        const at = Date.now();
        return {
          ...base,
          stampIds: [...base.stampIds, detourId],
          completedIds: base.completedIds.includes(detourId) ? base.completedIds : [...base.completedIds, detourId],
          history: [
            { id: `${at}-s`, label: `Stamp: ${stampMeta(detourId)?.name ?? detourId}`, stampId: detourId, at },
            ...base.history,
          ].slice(0, 30),
          last: { detourId, coins: 0, stampIds: [detourId] },
        };
      });
    },
    [update],
  );

  const setCommute = useCallback(
    (next: Commute) => {
      update((base) => ({ ...base, commute: next }));
    },
    [update],
  );

  const claimPrizes = useCallback(
    (detourId: string, prizes: Prize[]) => {
      update((base) => {
        const at = Date.now();
        let gained = 0;
        const history = [...base.history];
        prizes.forEach((prize, index) => {
          if (prize.kind === "coins") {
            gained += prize.amount;
            history.unshift({ id: `${at}-${index}`, label: `+${prize.amount} coins`, coins: prize.amount, at });
          }
        });
        if (gained === 0) {
          history.unshift({ id: `${at}-miss`, label: "Bad luck on the cards. No coins", coins: 0, at });
        }
        const sameDetour = base.last?.detourId === detourId;
        return {
          ...base,
          coins: base.coins + gained,
          history: history.slice(0, 30),
          last: { detourId, coins: gained, stampIds: sameDetour ? base.last!.stampIds : [] },
        };
      });
    },
    [update],
  );

  const redeem = useCallback(
    (offer: Offer) => {
      if (wallet.coins < offer.cost) return null;
      const code = newCode();
      update((base) => ({
        ...base,
        coins: base.coins - offer.cost,
        tickets: [{ offerId: offer.id, code, at: Date.now() }, ...base.tickets],
        history: [{ id: `${Date.now()}-r`, label: `Spent ${offer.cost} on ${offer.title}`, coins: -offer.cost, at: Date.now() }, ...base.history].slice(0, 30),
      }));
      return code;
    },
    [update, wallet.coins],
  );

  const value = useMemo<PrototypeState>(
    () => ({
      hintRevealed,
      clueRevealed,
      bennyDiscovered,
      bennyCollected: wallet.completedIds.includes("benny"),
      collectedIds: wallet.completedIds,
      lastCollectedId: wallet.last?.detourId ?? null,
      skippedDetour,
      commute: wallet.commute,
      coins: wallet.coins,
      stampIds: wallet.stampIds,
      history: wallet.history,
      tickets: wallet.tickets,
      lastClaim: wallet.last,
      setCommute,
      revealHint: () => setHintRevealed(true),
      revealClue: () => setClueRevealed(true),
      discoverBenny: () => setBennyDiscovered(true),
      completeDetour,
      claimPrizes,
      redeem,
      startDetour: () => {
        setHintRevealed(false);
        setClueRevealed(false);
      },
      skipDetour: () => setSkippedDetour(true),
    }),
    [hintRevealed, clueRevealed, bennyDiscovered, wallet, skippedDetour, setCommute, completeDetour, claimPrizes, redeem],
  );

  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const value = useContext(PrototypeContext);
  if (!value) {
    throw new Error("usePrototype must be used within PrototypeProvider");
  }
  return value;
}
