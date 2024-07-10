import styles from './Joystick.module.scss';
import P from 'prop-types';
import { Joystick } from "react-joystick-component";

export const JoystickControll = ({ 
  size = 40, 
  baseColor = `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5),  rgba(123, 123, 123, 0.5))`, 
  stickColor = "radial-gradient(circle at 50% 50%, rgba(208, 208, 208, 0.4), rgba(203, 203, 203, 0.4), rgba(120, 120, 120, 0.4))", 
  move, 
  stop, 
  start 
}) => {

  return (
    <div className={styles.container}>
      <Joystick
        size={size}
        baseColor={baseColor}
        stickColor={stickColor}
        throttle={200}
        move={move}
        stop={stop}
        start={start}
      />
    </div>
  )
}

Joystick.propTypes = {
  size: P.number,
  baseColor: P.string,
  stickColor: P.string,
  move: P.func.isRequired,
  stop: P.func,
  start: P.func
}