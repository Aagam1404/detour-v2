import { useParams } from "react-router-dom";
import { getDetour } from "@/data/detours";

export function useActiveDetour() {
  const { detourId } = useParams();
  return getDetour(detourId);
}
