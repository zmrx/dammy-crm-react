import { useState, type FC } from "react";
import "./Home.css";

export const PageHome: FC = () => {
  const [counter, setCounter] = useState(0);
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <button onClick={() => setCounter((c) => c + 1)}>count: {counter}</button>

      <button onClick={() => setIsShow(!isShow)}>click me</button>
    </div>
  );
};
