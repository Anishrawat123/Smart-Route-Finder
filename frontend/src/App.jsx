import { useState } from 'react'
import './App.css'
import Graph from './component/Graph'
import MapView from './component/MapView'

// CITY MAPPING (IMPORTANT)
const cityNames = {
  A: "Delhi",
  B: "Noida",
  C: "Gurgaon",
  D: "Ghaziabad"
};

function App() {
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState(null);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const findRoute = async () => {

    //  VALIDATION
    if (!start || !end) {
      alert("Please select Start and End");
      return;
    }

    setResult(null); // reset previous result
    setLoading(true);  // start loading

    if (start === end) {
      alert("Start and End cannot be same");
      return;
    }

    setLoading(true);  // start loading

    try {
      const res = await fetch(
        `http://localhost:5000/route?start=${start}&end=${end}`
      );
      const data = await res.json();
      await delay(1000); // Simulate delay

      console.log(data);

      if (data.error) {
        setResult({ error: data.error });
      } else {
        setResult(data);
      }

    } catch (error) {
      console.log(error);
    }
    setLoading(false); // stop loading
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-300 flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Smart Route Finder 🚀
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-xl w-80">

        {/* START */}
        <select
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Start</option>
          <option value="A">Delhi</option>
          <option value="B">Noida</option>
          <option value="C">Gurgaon</option>
          <option value="D">Ghaziabad</option>
        </select>

        {/* END */}
        <select
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-purple-400"
        >
          <option value="">Select End</option>
          <option value="A">Delhi</option>
          <option value="B">Noida</option>
          <option value="C">Gurgaon</option>
          <option value="D">Ghaziabad</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={findRoute}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg shadow-md hover:scale-105 transition duration-200"
        >
          {loading ? "Finding..." : "🚀Find Route"}
        </button>

        {loading ? (
          <div className="mt-3 text-center text-blue-600">Calculating shortest path...</div>
        ) : null}

        {/* RESULT */}
        {result && (
          <>
            {/* GRAPH */}
            {result.path && !result.error && (
              <div className="mt-5">
                <Graph path={result.path} />
              </div>
            )}

            {/* MAP */}
            {result.path && !result.error && (
              <div className="mt-5">
                <MapView path={result.path} />
              </div>
            )}

            {/* OUTPUT */}
            <div className="mt-4 p-3 bg-gray-100 rounded-lg shadow-inner">
              {result.error ? (
                <div className="bg-red-100 text-red-500 p-2 rounded mt-2">❌{result.error}</div>
              ) : (
                <>
                  {/* FROM → TO */}
                  <p className="text-lg">
                    <strong>From:</strong> {cityNames[start]} →
                    <strong> To:</strong> {cityNames[end]}
                  </p>

                  <p className="text-lg">
                    <strong>Distance:</strong> {result.distance}
                  </p>

                  {/* FIXED PATH */}
                  <p className="text-lg">
                    <strong>Path:</strong>{" "}
                    {result.path.map(node => cityNames[node]).join(" → ")}
                  </p>
                </>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default App;