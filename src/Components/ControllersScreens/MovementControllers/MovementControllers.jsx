import { KeyCard } from "../../KeyCard/KeyCard"

export const MovementControllers = ({ style }) => {

  return (
    <div>
      <div style={{ width: 300, textAlign: "center",...style }}>
        <div style={{ width: "100%" }}><KeyCard label={"w"} /></div>
        <KeyCard label={"s"} />
        <KeyCard label={"a"} />
        <KeyCard label={"d"} />
      </div>
    </div>
  )
}
