import React, { ReactElement, useEffect } from 'react';
import './Input.scss';

const Input = ({ input, doFunc, width }: { input: ReactElement; doFunc?: any; width?: string }) => {
  useEffect(() => {
    if (doFunc) {
      doFunc();
    }
  }, []);

  return (
    <div className="my-input" style={width ? { width: width } : {}}>
      {input}
    </div>
  );
};

export default Input;
