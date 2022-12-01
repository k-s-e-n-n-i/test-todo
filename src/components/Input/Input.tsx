import React, { ReactElement } from 'react';
import './Input.scss';

const Input = ({ input }: { input: ReactElement }) => {
  return <div className="my-input">{input}</div>;
};

export default Input;
