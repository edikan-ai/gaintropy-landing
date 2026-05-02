import type { ProfileDefinition, ProfileId } from "../types";
import steelLong from "./steel-long";
import steelFlat from "./steel-flat";
import discreteHighmix from "./discrete-highmix";
import discreteLowmix from "./discrete-lowmix";
import water from "./water";
import energy from "./energy";
import chemical from "./chemical";
import food from "./food";

export const PROFILES: Record<ProfileId, ProfileDefinition> = {
  "steel-long": steelLong,
  "steel-flat": steelFlat,
  "discrete-highmix": discreteHighmix,
  "discrete-lowmix": discreteLowmix,
  "water": water,
  "energy": energy,
  "chemical": chemical,
  "food": food,
};

export const PROFILE_LIST: ProfileDefinition[] = Object.values(PROFILES);

export function getProfile(id: ProfileId): ProfileDefinition {
  return PROFILES[id];
}
