import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/counter/")
      .then((data: any) => setCount(data.data.count))
      .catch(console.error);
  }, []);

  function incrementCounter() {
    axios
      .post("http://localhost:3001/api/counter/")
      .then((data: any) => setCount(data.data.count))
      .catch(console.error);
  }

  return (
    <div className="app">
      <h1>Curse counter: {count}</h1>
      <h2>Sum: {count * 100} rubles</h2>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
}

export default App;
