import style from "./KeyCard.module.scss";

export const KeyCard = ({ label, width, height }) => {

  return (
    <div>
      <div className={style.card} style={{width, height}}>
        {label}
      </div>
    </div>
  )
}
