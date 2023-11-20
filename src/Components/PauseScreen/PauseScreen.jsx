import style from "./PauseScreen.module.scss";

export const PauseScreen = ({ goMenuFunc }) => {

  return (
    <div className={`${style["pause-info"]}`}>
      PAUSED
      <button
        className={`${style["menu-button"]}`}
        onClick={goMenuFunc}
      >
        Menu Inicial
      </button>
    </div>
  )
}