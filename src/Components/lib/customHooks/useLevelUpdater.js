import { useEffect } from "react";
import * as types from "../../../contexts/types.js";

export const useLevelUpdater = ({points, gameState, gameDispatch, setLevelUpAnimation}) => {
  useEffect(() => {
    let level = 0;

    if (points > 50) {
      level++;
    }

    if (points > 120) {
      level++;
    }

    if (points > 190) {
      level++;
    }

    if (points > 280) {
      level++;
    }

    if (points > 400) {
      level++;
    }

    if (level !== gameState.level && !gameState.paused) {
      gameDispatch({ type: types.LEVEL_UP });
      gameDispatch({ type: types.PAUSE });
      setLevelUpAnimation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);
}
