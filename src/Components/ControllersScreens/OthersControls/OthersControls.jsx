import { KeyCard } from "../../KeyCard/KeyCard"

export const OthersControls = ({ style }) => {

  return (
    <div>
      <div style={{ textAlign: "center", ...style }}>
        <KeyCard label={"p"} topDescription={"pause"} />
        <KeyCard width={200} label={"space"} topDescription={"shot"} />
      </div>
    </div>
  )
}
