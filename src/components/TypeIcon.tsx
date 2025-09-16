import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import bugIcon from "../assets/types/bug.png";
import darknessIcon from "../assets/types/darkness.png";
import dragonIcon from "../assets/types/dragon.png";
import lightningIcon from "../assets/types/lightning.png";
import fairyIcon from "../assets/types/fairy.png";
import fightingIcon from "../assets/types/fighting.png";
import fireIcon from "../assets/types/fire.png";
import flyingIcon from "../assets/types/flying.png";
import ghostIcon from "../assets/types/ghost.png";
import grassIcon from "../assets/types/grass.png";
import groundIcon from "../assets/types/ground.png";
import iceIcon from "../assets/types/ice.png";
import colorlessIcon from "../assets/types/colorless.png";
import poisonIcon from "../assets/types/poison.png";
import psychicIcon from "../assets/types/psychic.png";
import rockIcon from "../assets/types/rock.png";
import metalIcon from "../assets/types/metal.png";
import waterIcon from "../assets/types/water.png";

const typeIcons = {
  Bug: bugIcon,
  Darkness: darknessIcon,
  Dragon: dragonIcon,
  Lightning: lightningIcon,
  Fairy: fairyIcon,
  Fighting: fightingIcon,
  Fire: fireIcon,
  Flying: flyingIcon,
  Ghost: ghostIcon,
  Grass: grassIcon,
  Ground: groundIcon,
  Ice: iceIcon,
  Colorless: colorlessIcon,
  Poison: poisonIcon,
  Psychic: psychicIcon,
  Rock: rockIcon,
  Metal: metalIcon,
  Water: waterIcon,
} as const;

export type PokemonType = keyof typeof typeIcons;

interface TypeIconProps {
  type: PokemonType;
}

export function TypeIcon({ type }: TypeIconProps) {
  const icon = typeIcons[type];

  if (!icon) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <img src={icon} alt={type} className="w-8 h-8" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{type}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
