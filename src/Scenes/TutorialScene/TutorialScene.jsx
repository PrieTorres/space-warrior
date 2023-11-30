import { MovementControllers } from "../../Components/ControllersScreens/MovementControllers/MovementControllers"
import { OthersControls } from "../../Components/ControllersScreens/OthersControls/OthersControls";
import style from "./TutorialScene.module.scss";

export const TutorialScene = () =>{

  return(
    <div className={style.container}>
      <div className={style.box}>
        <MovementControllers />
        <OthersControls />
      </div>
    </div>
  )
}
