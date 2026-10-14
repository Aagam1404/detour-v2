import type { AccessoryType, BustPoseType, FaceType, FacialHairType, HairType } from "react-peeps";

export type Avatar = {
  id: string;
  hair: HairType;
  face: FaceType;
  body: BustPoseType;
  accessory: AccessoryType;
  facialHair: FacialHairType;
};

export const avatars: Avatar[] = [
  { id: "short", hair: "ShortVolumed", face: "Smile", body: "Shirt", accessory: "None", facialHair: "None" },
  { id: "bun", hair: "Bun", face: "Cute", body: "Dress", accessory: "GlassRound", facialHair: "None" },
  { id: "afro", hair: "Afro", face: "Cheeky", body: "Hoodie", accessory: "None", facialHair: "None" },
  { id: "hijab", hair: "Hijab", face: "Calm", body: "Turtleneck", accessory: "None", facialHair: "None" },
  { id: "beanie", hair: "Beanie", face: "SmileTeeth", body: "StripedShirt", accessory: "None", facialHair: "Goatee" },
  { id: "curly", hair: "LongCurly", face: "SmileBig", body: "Sweater", accessory: "GlassAviator", facialHair: "None" },
  { id: "turban", hair: "Turban", face: "Serious", body: "BlazerBlackTee", accessory: "None", facialHair: "FullMedium" },
  { id: "twists", hair: "Twists", face: "LoveGrin", body: "SportyShirt", accessory: "None", facialHair: "None" },
  { id: "mohawk", hair: "Mohawk", face: "Cheeky", body: "Coffee", accessory: "SunglassWayfarer", facialHair: "None" },
];

export const defaultAvatarId = avatars[0].id;

export function avatarById(id: string | null) {
  return avatars.find((avatar) => avatar.id === id) ?? avatars[0];
}
