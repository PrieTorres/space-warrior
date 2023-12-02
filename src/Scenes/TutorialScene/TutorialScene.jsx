import { useState } from "react";
import { MovementControllers } from "../../Components/ControllersScreens/MovementControllers/MovementControllers"
import { OthersControls } from "../../Components/ControllersScreens/OthersControls/OthersControls";
import style from "./TutorialScene.module.scss";

export const TutorialScene = () => {
  const [show, setShow] = useState(true);

  if (!show) return;
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style["close-modal-container"]}>
          <span
            className={style["close-modal"]}
            onClick={() => setShow(false)}
          >X</span>
        </div>
        <MovementControllers />
        <OthersControls />
      </div>
    </div>
  )
}
