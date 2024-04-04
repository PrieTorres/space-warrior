import styles from "./BigLetter.module.scss";

export const BigLetter = ({ letter, active }) => {

  return (
    <div>
      <div className={`${styles.letter} ${active ? styles.active : ""}`} active={active}>
        {letter}
      </div>
    </div>
  )
}