import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [namesText, setNamesText] = useState("");
  const [names, setNames] = useState([]);
  const [picked, setPicked] = useState([]);
  const [current, setCurrent] = useState(null);
  const [phase, setPhase] = useState("input");

  function loadNames() {
    const arr = namesText
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n);

    setNames(arr);
    setPicked([]);
    setCurrent(null);
    setPhase("game");
  }

  function play() {
    if (names.length === 0) return;

    const r = names[Math.floor(Math.random() * names.length)];

    setCurrent(r);
    setPicked([...picked, r]);
    setNames(names.filter((n) => n !== r));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-indigo-200 flex flex-col items-center p-6 text-gray-700">
      <h1 className="text-4xl font-bold text-pink-600 drop-shadow mb-6">✨ Mini-Game Cute ✨</h1>

      {/* --- PANTALLA DE INPUT --- */}
      {phase === "input" && (
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
          <p className="mb-2">Introduce nombres (uno por línea):</p>

          <textarea
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
            className="w-full h-40 p-3 border rounded-xl shadow-inner"
          />

          <button
            onClick={loadNames}
            className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl shadow"
          >
            Comenzar
          </button>
        </div>
      )}

      {/* --- PANTALLA DE JUEGO --- */}
      {phase === "game" && (
        <div className="flex flex-col items-center w-full max-w-xl">

          {/* Bola cute animada */}
          <motion.div
            key={current}
            initial={{ scale: 0, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-80 h-80 rounded-full bg-white shadow-2xl flex items-center justify-center text-3xl font-bold border-4 border-pink-400 mb-6"
          >
            {current ? current : "🤍"}
          </motion.div>

          <button
            onClick={play}
            disabled={names.length === 0}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white py-3 px-8 rounded-xl shadow mb-6"
          >
            ¡Jugar!
          </button>

          {/* Lista de seleccionados */}
          <div className="w-full bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Seleccionados:</h2>

            <div className="flex flex-wrap gap-2">
              {picked.map((n) => (
                <motion.span
                  key={n}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-3 py-1 bg-pink-200 rounded-full shadow"
                >
                  {n}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
