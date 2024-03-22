import styles from "./BigLetter.module.scss";

export const BigLetter = ({ letter, active }) => {

  return (
    <div>
      <div className={styles.letter}>
        {letter}
      </div>
    </div>
  )
}