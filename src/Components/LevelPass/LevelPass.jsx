import { useEffect, useRef, useState } from "react"
import style from "./LevelPass.module.scss";

export const LevelPass = ({ level, show, secondsToDisplay }) => {
  const container = useRef();
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    let timeoutToEnter, timeoutToLeave;

    timeoutToEnter = setTimeout(() => {
      if (container.current?.classList !== undefined) setAnimationClass("centered-x");
      timeoutToLeave = setTimeout(() => {
        setAnimationClass("out-right");
      }, secondsToDisplay);
    }, 100);
   
    return () => {
      if (timeoutToLeave != undefined) clearTimeout(timeoutToLeave);
      if (timeoutToEnter != undefined) clearTimeout(timeoutToEnter);
    };
  }, [secondsToDisplay, show]);

  if (!show) return;
  return (
    <>
      <div className={`${style["level-container"]}`} >
        <div className={`${style["level-box"]} ${style["centered-x"]}`} ref={container}>
          <span className={`${style["text"]}`}>Você passou de nível!</span>
          <p className={`${style["level-num"]}`}>{level}</p>
        </div>
      </div>
    </>
  )
}