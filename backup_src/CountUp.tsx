import { useState, useEffect } from 'react';

const UseEffectTest = () => {
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    console.log('useEffect!!', cnt);
    return () => {
      console.log("cleanup!!", cnt);
    }
  }, [cnt]);


  
  return (
    <>
      <p>{cnt}번 클릭</p>
      <button onClick={() => setCnt((prevCnt: number) => prevCnt + 1)}>push!</button>
      <button onClick={() => setCnt(0)}>초기화하기!</button>
    </>
  );
};

export default UseEffectTest;