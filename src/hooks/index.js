import { useState, useEffect } from "react";

function useStateWithCallback(initialState) {
  const [value, setValue] = useState(initialState);
  const [callback, setCallback] = useState(null);

  useEffect(() => {
    if (callback) {
      callback(value);
    }
  }, [value]);

  function setState(setStateValue, setStateCallback) {
    setValue(setStateValue);
    setCallback(setStateCallback ? () => state => setStateCallback(state) : null);
  }

  return [value, setState];
}

export default useStateWithCallback;
