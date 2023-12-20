import { useEffect } from "react";

export const useMunitionCooldown = ({ gameState, spaceShip, munitionCount, setMunitionCount, setMunitionReload }) => {
  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      if (gameState.paused) return;
      counter += 100;
      const percent = (counter / spaceShip.cooldown) * 100;

      if (percent >= 100) {
        if (munitionCount < spaceShip.initialMunition) {
          if (munitionCount === 0) setMunitionCount(spaceShip.initialMunition);
          else setMunitionCount((prev) => prev + 1);
        }

        setMunitionReload(100);
        return clearInterval(interval);
      }

      setMunitionReload(percent.toFixed(0));
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.paused, spaceShip, munitionCount, setMunitionCount, setMunitionReload]);
};
