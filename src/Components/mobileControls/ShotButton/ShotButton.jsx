import styles from './ShotButton.module.scss';
import P from 'prop-types';

export const ShotButton = ({ shotFunction }) => {

  return (
    <button className={styles.container} onTouchStart={shotFunction} />
  )
}

ShotButton.propTypes = {
  shotFunction: P.func.isRequired,
}
