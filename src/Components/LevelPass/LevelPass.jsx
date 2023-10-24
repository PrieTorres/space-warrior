import { useEffect, useRef, useState } from "react"
import style from "./LevelPass.module.scss";

export const LevelPass = ({ level, show, secondsToDisplay }) => {
  const container = useRef();
  const [insideShow, setInsideShow] = useState(show);
  const [showIn, setShowIn] = useState(true);

  useEffect(() => {
    if(insideShow !== show){
      setInsideShow(show);
    }
  }, [show]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIn(false);
      container.current?.addEventListener('animationend', () => {
        setInsideShow(false);
      });
    }, secondsToDisplay);

    return () => clearTimeout(timeout);
  }, [secondsToDisplay, show]);

  return (
    <>
      {insideShow ?
        <div className={`${style["level-container"]}`} >
          <div className={`${style["level-box"]} ${showIn ? "animate__animated animate__bounceInLeft" : "animate__animated animate__bounceOutRight"}`} ref={container}>
            <span className={`${style["text"]}`}>Você passou de nível!</span>
            <p className={`${style["level-num"]}`}>{level}</p>
          </div>
        </div>
        : undefined}
    </>
  )
}