import { useEffect, useRef, useState } from "react"
import style from "./LevelPass.module.scss";

export const LevelPass = ({ level, show, secondsToDisplay }) => {
  const container = useRef();
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (container.current?.classList !== undefined) setAnimationClass("centered-x");
    const timeout = setTimeout(() => {
      setAnimationClass("out-right");
    }, secondsToDisplay);

    return () => clearTimeout(timeout);
  }, [secondsToDisplay, show]);

  if (!show) return;
  console.log({ show, animationClass }, container.current?.classList);
  return (
    <>
      <div className={`${style["level-container"]}`} >
        <div className={`${style["level-box"]} ${style[animationClass]}`} ref={container}>
          <span className={`${style["text"]}`}>Você passou de nível!</span>
          <p className={`${style["level-num"]}`}>{level}</p>
        </div>
      </div>
    </>
  )
}