import style from "./KeyCard.module.scss";

export const KeyCard = ({ label, width = 40, height, topDescription, description }) => {

  return (
    <div className={style["card-container"]} title={description || topDescription || "key control"}>
      {topDescription && <p style={{ width: "100%" }}>{topDescription}</p>}
      <div className={style.card} style={{ width, height }}>
        <p>{label}</p>
        {/* <div className={style["pixel-art"]}></div> */}
      </div>
    </div>
  )
}
