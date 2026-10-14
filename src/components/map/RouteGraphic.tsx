import routeOne from "@/assets/illustrations/route-1.svg";
import routeTwo from "@/assets/illustrations/route-2.svg";
import routeThree from "@/assets/illustrations/route-3.svg";

type RouteGraphicProps = {
  variant: "onboarding-1" | "onboarding-2" | "onboarding-3";
};

const layers: Record<RouteGraphicProps["variant"], { src: string; className: string }[]> = {
  "onboarding-1": [{ src: routeOne, className: "route-layer route-layer--one" }],
  "onboarding-2": [{ src: routeTwo, className: "route-layer route-layer--two" }],
  "onboarding-3": [{ src: routeThree, className: "route-layer route-layer--three" }],
};

export function RouteGraphic({ variant }: RouteGraphicProps) {
  return (
    <>
      {layers[variant].map((layer) => (
        <div key={layer.className} className={layer.className}>
          <div className="route-layer__shape">
            <img className="route-layer__image" src={layer.src} alt="" />
          </div>
        </div>
      ))}
    </>
  );
}
