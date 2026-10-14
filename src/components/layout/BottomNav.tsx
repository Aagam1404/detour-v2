import { NavLink } from "react-router-dom";
import mapIcon from "@/assets/icons/nav-map.svg";
import stickersIcon from "@/assets/icons/nav-stickers.svg";
import rewardsIcon from "@/assets/icons/nav-rewards.svg";
import meIcon from "@/assets/icons/nav-me.svg";

const items = [
  { to: "/home", label: "Map", icon: mapIcon },
  { to: "/stickers", label: "Stamps", icon: stickersIcon },
  { to: "/rewards", label: "Rewards", icon: rewardsIcon },
  { to: "/me", label: "Me", icon: meIcon },
] as const;

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => (isActive ? "bottom-nav__item bottom-nav__item--active" : "bottom-nav__item")}
        >
          <span className="bottom-nav__icon">
            <img src={item.icon} alt="" width={22} height={22} />
          </span>
          <span className="bottom-nav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
