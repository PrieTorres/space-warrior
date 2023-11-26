import style from "./KeyCard.module.scss";

export const KeyCard = ({ label, width = 40, height, topDescription }) => {

  return (
    <div style={{ display: "inline-block" }}>
      {topDescription && <p style={{ width }}>{topDescription}</p>}
      <div className={style.card} style={{ width, height }}>
        {label}
        {/* <div className={style["pixel-art"]}></div> */}
      </div>
    </div>
  )
}
