import React, { useState } from "react";
import InputForm from "./InputForm";
import GameCanvas from "./GameCanvas";
import sampleWorld from "./sampleWorld.json"; // we’ll create a static JSON world for testing

function App() {
  const [era, setEra] = useState<string | null>(null);
  const [worldData, setWorldData] = useState<typeof sampleWorld | null>(null);

  const handleGenerate = (enteredEra: string) => {
    console.log("Era selected:", enteredEra);
    setEra(enteredEra);

    // For now: load static sample world
    setWorldData(sampleWorld);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">AI RPG Demo</h1>
      <InputForm onGenerate={handleGenerate} />

      {era && (
        <p className="mt-4 text-lg text-gray-900">
          World will be generated for: <b>{era}</b>
        </p>
      )}

      {worldData && <GameCanvas worldData={worldData} />}
    </div>
  );
}

export default App;
