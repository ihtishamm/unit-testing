import { useState } from 'react';

export default function Counter({ initial = 0, step = 1 }) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => setCount(initial);

  return (
    <div>
      <h1 aria-label="count" id="count">
        Count: {count}
      </h1>
      <button onClick={increment} id="Increment">
        Increment
      </button>
      <button onClick={decrement} id="Decrement">
        Decrement
      </button>
      <button onClick={reset} id="Reest">
        Reset
      </button>
      <label htmlFor="inputData">Add the value</label>
      <input id="inputData" />
    </div>
  );
}
