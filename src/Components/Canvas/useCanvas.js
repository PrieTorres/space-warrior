import { useMemo } from "react";
import Canvas from "./Canvas";

export const useCanvas = (ref, gameScreenHeight, gameScreenWidth) => {
  return useMemo(
    () => (
      <Canvas
        id="main-screen-canvas"
        canvasRef={ref}
        height={gameScreenHeight}
        width={gameScreenWidth}
        canvasStyle={{
          backgroundColor: "#000000a6",
          backgroundImage: `url('${process.env.PUBLIC_URL}/images/backgrounds/space1.gif')`,
          border: "1px solid black",
        }}
      />
    ),
    [ref, gameScreenHeight, gameScreenWidth],
  );
}