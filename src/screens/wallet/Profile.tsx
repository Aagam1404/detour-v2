import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PeepModule from "react-peeps";

const Peep = ((PeepModule as { default?: typeof PeepModule }).default ?? PeepModule) as typeof PeepModule;
import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Sticker } from "@/components/ui/Sticker";
import { detourStamps } from "@/data/stamps";
import { levelFor, neighbourhoodsExplored } from "@/data/wallet";
import { CoinIcon } from "@/components/ui/CoinPill";
import { usePrototype } from "@/state/PrototypeState";
import { avatarById, avatars, defaultAvatarId } from "@/data/avatars";
import { collection } from "@/data/detours";
import { toCollect } from "@/data/toCollect";
import { useAuth } from "@/state/AuthState";

const PEEP_FRAME = { x: "140", y: "0", width: "570", height: "780" };

function avatarStorageKey(username: string) {
  return `detour.avatar.${username.trim().toLowerCase()}`;
}

export function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const name = user?.name ?? "New local";
  const username = user?.username ?? "detour";
  const [avatarId, setAvatarId] = useState(defaultAvatarId);
  const [picking, setPicking] = useState(false);
  const avatar = avatarById(avatarId);
  const { coins, stampIds, collectedIds } = usePrototype();
  const level = levelFor(collectedIds.length);

  useEffect(() => {
    const saved = localStorage.getItem(avatarStorageKey(username));
    setAvatarId(saved && avatars.some((item) => item.id === saved) ? saved : defaultAvatarId);
  }, [username]);

  const chooseAvatar = (id: string) => {
    setAvatarId(id);
    localStorage.setItem(avatarStorageKey(username), id);
    setPicking(false);
  };

  return (
    <AppScreen nav>
      <div className="profile">
        <header className="profile__hero">
          <button type="button" className="profile__avatar" onClick={() => setPicking(true)} aria-label="Change avatar">
            <Peep
              accessory={avatar.accessory}
              body={avatar.body}
              face={avatar.face}
              facialHair={avatar.facialHair}
              hair={avatar.hair}
              strokeColor="#171717"
              backgroundColor="#ffffff"
              viewBox={PEEP_FRAME}
            />
          </button>
        </header>
        <div className="profile__identity">
          <h1>{name}</h1>
          <p>@{username}</p>
        </div>
        <div className="profile__stats">
          <div>
            <strong className="profile__coins">
              <CoinIcon size={20} />
              {coins}
            </strong>
            <span>coins</span>
          </div>
          <div>
            <strong>{neighbourhoodsExplored(collectedIds)}</strong>
            <span>neighbourhoods explored</span>
          </div>
          <div>
            <strong>{collectedIds.length}</strong>
            <span>detours</span>
          </div>
        </div>
        <div className="level">
          <div className="level__row">
            <strong>{level.name}</strong>
            <span>{level.next ? `${level.remaining} more ${level.remaining === 1 ? "detour" : "detours"} to ${level.next}` : "Top of the book"}</span>
          </div>
          <span className="level__bar" aria-hidden="true">
            <i style={{ width: `${Math.round(level.progress * 100)}%` }} />
          </span>
        </div>
        <section className="profile__panel">
          <h2 className="profile__h">My stamps</h2>
          <div className="book__grid">
            {toCollect.map((stamp) => {
              const meta = collection.find((item) => item.id === stamp.id);
              const owned = stampIds.includes(stamp.id);
              return (
                <Sticker
                  key={stamp.id}
                  id={stamp.id}
                  name={stamp.name}
                  place={stamp.place}
                  theme={meta?.theme ?? "oddity"}
                  tone={meta?.tone ?? "yellow"}
                  locked={!owned}
                  rotation={0}
                  stamp={detourStamps[stamp.id]}
                />
              );
            })}
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Log out
          </Button>
        </section>
        {picking ? (
          <div className="avatar-sheet" role="dialog" aria-label="Choose an avatar">
            <div className="avatar-sheet__bar">
              <h2>Choose a peep</h2>
              <button type="button" onClick={() => setPicking(false)}>
                Done
              </button>
            </div>
            <div className="avatar-sheet__grid">
              {avatars.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === avatarId ? "avatar-sheet__peep avatar-sheet__peep--selected" : "avatar-sheet__peep"}
                  aria-label={`Peep ${item.id}`}
                  aria-pressed={item.id === avatarId}
                  onClick={() => chooseAvatar(item.id)}
                >
                  <Peep
                    accessory={item.accessory}
                    body={item.body}
                    face={item.face}
                    facialHair={item.facialHair}
                    hair={item.hair}
                    strokeColor="#171717"
                    backgroundColor="#ffffff"
                    viewBox={PEEP_FRAME}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </AppScreen>
  );
}
