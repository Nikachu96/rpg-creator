import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import { createGameConfig } from "./game/engine"; // we’ll create this next

function GameCanvas({ worldData }) {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!worldData) return; // don’t load Phaser if no world yet

    const config = createGameConfig(gameRef.current, worldData);
    const game = new Phaser.Game(config);

    // Cleanup when component unmounts
    return () => {
      game.destroy(true);
    };
  }, [worldData]);

  return (
    <div
      ref={gameRef}
      className="w-[800px] h-[250px] border-2 border-gray-400 mt-4"
    >
      {/* Phaser canvas will be injected here */}
    </div>
  );
}

export default GameCanvas;
