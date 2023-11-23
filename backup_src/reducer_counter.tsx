import React, { useReducer } from "react";

interface State {
  count: number;
}

interface Action {
  type: string;
  payload: number;
}

const init = (initialState: number) => {
  return { count: initialState };
}

function count_reducer(state: State, action: Action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.payload };

    case "DECREMENT":
      return { count: state.count - action.payload };

    case "RESET":
      return init(action.payload);
    
    default:
      throw new Error(`unsupported action type: ${action.type}`);
  }
}
// initialCount 인자 값 받기
const Counter = ({ initialCount }: { initialCount: number }) => {
  const [state, dispatch] = useReducer(count_reducer, initialCount, init);

  return (
    <>
      <h2>reducer count: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'RESET', payload: 0 })}>Reset</button>
      <button onClick={() => dispatch({ type: 'INCREMENT', payload: 2 })}>+2</button>
      <button onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}>-1</button>
      <button onClick={() => dispatch({ type: 'NOPE', payload: 1 })}>Error</button>
    </>
  );
};

export default Counter;

