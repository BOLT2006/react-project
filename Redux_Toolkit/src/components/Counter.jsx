import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseby1,
  increaseby10,
  decreaseby1,
  decreaseby10,
  increasebyvalue
} from "../App/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter Value = {count} </h1>
      <button onClick={() => dispatch(increaseby1())}>Increase by 1</button>      
      <button onClick={() => dispatch(increaseby10())}>Increase by 10</button>
      <button onClick={() => dispatch(decreaseby1())}>Decrease by 1</button>
      <button onClick={() => dispatch(decreaseby10())}> Decrease by 10</button>
      <button onClick={() => dispatch(increasebyvalue(100))}>Increase by Value</button>
    </div>
  );
};

export default Counter;
