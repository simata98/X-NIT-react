import React, {useState} from 'react';
import * as ReactDOM from 'react-dom/client';

const Main = () => {
  const [state, setState] = useState({cnt: 0}) 
  const updateCnt = (val: keyof typeof state) =>
    setState({
      ...state,
      [val] : state[val] + 1
    })
  const { cnt } = state;
    return (
        <div>
        <h1>안녕하세요. 클릭한 횟수는 {cnt} 입니다.</h1>
        <button onClick={() => updateCnt('cnt')}>push!</button>
        <button onClick={() => setState({cnt: 0})}>초기화하기!</button>
        </div>
    );
};


const rootElement = document.getElementById("root");
const root = rootElement ? ReactDOM.createRoot(rootElement) : null;

if (root) {
  root.render(
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  );
}

export default Main;