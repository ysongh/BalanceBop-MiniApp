import { useState } from "react";
import { useDeviceOrientation } from "./hooks/useDeviceOrientation";
import { usePhysics } from "./hooks/usePhysics";
import { CanvasRenderer } from "./components/CanvasRenderer";

function App() {
  const { beta, gamma } = useDeviceOrientation();
  const { engine, boxes } = usePhysics(gamma);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  console.log(boxes)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Balance Game</h1>
      <p className="text-lg">Score: {score}</p>
      {gameOver && <p className="text-red-500 text-xl">Game Over!</p>}
      <CanvasRenderer engine={engine} boxes={boxes} />
      <p className="text-sm">Tilt: β={beta.toFixed(1)}, γ={gamma.toFixed(1)}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => window.location.reload()}
      >
        Restart
      </button>
    </div>
  );
}

export default App;