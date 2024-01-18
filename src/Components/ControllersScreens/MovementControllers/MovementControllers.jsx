import { KeyCard } from "../../KeyCard/KeyCard"

export const MovementControllers = ({ style }) => {

  return (
    <div>
      <div style={{ textAlign: "center", ...style }}>
        <div style={{ width: "100%" }}><KeyCard label={"w"} description={"moves spaceship to top"} /></div>
        <KeyCard label={"a"} description={"moves spaceship to left"} />
        <KeyCard label={"s"} description={"moves spaceship to bottom"} />
        <KeyCard label={"d"} description={"moves spaceship to right"} />
        <div>Move SpaceShip</div>
      </div>
    </div>
  )
}
