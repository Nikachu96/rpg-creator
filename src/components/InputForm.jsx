import React, { useState } from "react";

function InputForm({ onGenerate }) {
  const [era, setEra] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (era.trim() === "") return;
    onGenerate(era); // send the era back to App.jsx
    setEra(""); // optional: clear input after submit
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-2 p-4"
    >
      <input
        type="text"
        placeholder="Enter a time period (e.g., Ancient Rome)"
        value={era}
        onChange={(e) => setEra(e.target.value)}
        className="border p-2 rounded w-64 text-center"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate World
      </button>
    </form>
  );
}

export default InputForm;