import styles from './PauseButton.module.scss';
import P from 'prop-types';

export const PauseButton = ({pauseFunction}) => {

  return (
    <button onClick={pauseFunction} className={styles["pause-button"]}>
      | |
    </button>
  )
}

PauseButton.propTypes = {
  pauseFunction: P.func.isRequired,
}