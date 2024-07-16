import { useContext, useState } from "react";
import { MovementControllers } from "../../Components/ControllersScreens/MovementControllers/MovementControllers"
import { OthersControls } from "../../Components/ControllersScreens/OthersControls/OthersControls";
import style from "./TutorialScene.module.scss";
import { GameContext } from "../../contexts/GameContext";
import { CLOSE_TUTORIAL } from "../../contexts/types.js";

export const TutorialScene = () => {
  const { gameDispatch, gameState } = useContext(GameContext);

  if (!gameState.showTutorial) return;
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style["close-modal-container"]}>
          <button
            className={style["close-modal"]}
            onClick={() => {
              gameDispatch({ type: CLOSE_TUTORIAL });
            }}
          >X</button>
        </div>
        <MovementControllers />
        <OthersControls />
      </div>
    </div>
  )
}
