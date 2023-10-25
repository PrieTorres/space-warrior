import { useEffect, useRef, useState } from "react"
import style from "./LevelPass.module.scss";

export const LevelPass = ({ level, show, secondsToDisplay }) => {
  const container = useRef();
  const [insideShow, setInsideShow] = useState(show);
  const [showIn, setShowIn] = useState(false);
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    if(insideShow !== show){
      setInsideShow(show);
    }
  }, [show]);

  useEffect(() => {
    setShowIn(true);
    const timeout = setTimeout(() => {
      setShowIn(false);
      setShowOut(true);
    }, secondsToDisplay);

    return () => clearTimeout(timeout);
  }, [secondsToDisplay, show]);

  return (
    <>
      {insideShow ?
        <div className={`${style["level-container"]}`} >
          <div className={`${style["level-box"]} ${style[showIn ? "centered-x" : showOut? "out-right" : ""]}`} ref={container}>
            <span className={`${style["text"]}`}>Você passou de nível!</span>
            <p className={`${style["level-num"]}`}>{level}</p>
          </div>
        </div>
        : undefined}
    </>
  )
}