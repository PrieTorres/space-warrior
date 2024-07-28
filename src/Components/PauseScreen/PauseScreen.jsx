import { useContext, useState } from "react";
import style from "./PauseScreen.module.scss";
import { GameContext } from "../../contexts/GameContext";
import * as types from "../../contexts/types.js";

export const PauseScreen = ({ goMenuFunc }) => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { joystickSize, } = gameState;
  const [sizeJoy, setSizeJoy] = useState(joystickSize);

  function handleJoystickTurn() {
    let enable = !gameState?.touchScreen;

    if (enable) {
      gameDispatch({ type: types.TOUCH_MODE });
    } else {
      gameDispatch({ type: types.DISABLE_JOYSTYCK });
    }
  }

  function handleJoystickRevert() {
    gameDispatch({ type: types.JOYSTYCK_REVERT })
  }

  function handleJoySize(size) {
    gameDispatch({ type: types.CHANGE_JOYSTYCK, payload: { size } });
  }

  return (
    <div className={`${style["pause-info"]}`}>
      <span className={`${style["title"]}`}>PAUSED</span>
      <label>
        Joystick Size:
        <input
          type="number"
          name="joystick-size"
          id="joystick-size-input"
          value={sizeJoy}
          onChange={({ target }) => setSizeJoy(parseInt(target.value))}
          onBlur={() => handleJoySize(sizeJoy)}
          style={{ width: 40 }}
        />
      </label>
      <label style={{ gap: 10 }}>
        Joystick revert:
        <button
          className={`${style["menu-button"]}`}
          onClick={handleJoystickRevert}
        >{gameState.joystickRevert ? "off" : "on"}</button>
      </label>
      <button
        className={`${style["menu-button"]}`}
        onClick={handleJoystickTurn}
      >
        Joystick {gameState?.touchScreen ? "On" : "Off"}
      </button>
      <button
        className={`${style["menu-button"]}`}
        onClick={() => gameDispatch({ type: types.TUTORIAL_DISPLAY })}
      >
        Tutorial
      </button>
      <button
        className={`${style["menu-button"]}`}
        onClick={() => gameDispatch({ type: types.PAUSE })}
      >
        Resume
      </button>
      <button
        className={`${style["menu-button"]}`}
        onClick={goMenuFunc}
      >
        Menu
      </button>
    </div>
  )
}
