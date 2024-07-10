import styles from './ShotButton.module.scss';
import P from 'prop-types';

export const ShotButton = ({ shotFunction }) => {

  return (
    <button className={styles.container} onClick={shotFunction} />
  )
}

ShotButton.propTypes = {
  shotFunction: P.func.isRequired,
}