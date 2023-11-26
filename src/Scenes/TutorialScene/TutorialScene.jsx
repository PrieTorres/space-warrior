import { MovementControllers } from "../../Components/ControllersScreens/MovementControllers/MovementControllers"
import style from "./TutorialScene.module.scss";

export const TutorialScene = ({}) =>{

  return(
    <div className={style.container}>
      <div className={style.box}>
        <MovementControllers />
      </div>
    </div>
  )
}
