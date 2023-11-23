import React, {useState} from 'react';
import * as ReactDOM from 'react-dom/client';

const Main = () => {
  const [cnt, setCnt] = useState(0) 
  // const updateCnt = () => setCnt(cnt + 1);
  // const clearCnt = () => setCnt(0);
    return (
        <div>
        <h1>안녕하세요. 클릭한 횟수는 {cnt} 입니다.</h1>
        <button onClick={() => setCnt((prevCnt: number) => prevCnt + 1)}>push!</button>
        <button onClick={() => setCnt(0)}>초기화하기!</button>
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