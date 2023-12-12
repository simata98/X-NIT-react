import { useEffect, useState } from "react";

const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export default function useCountUp(end: number, start = 0, duration = 2000) {
  const [count, setCount] = useState(start);
  const frameRate = 1000 / 60; // set frame rate to 60fps
  const totalFrame = Math.round(duration / frameRate); // total frame count

  useEffect(() => {
    let currentNumber = start;
    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentNumber / totalFrame); // calculate the current progress
      setCount(Math.round(end * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);
  }, [end, frameRate, start, totalFrame]);
  return count;
}
