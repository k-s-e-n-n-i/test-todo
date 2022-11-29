import { Input } from '@mui/material';
import React, { useEffect } from 'react';

const EditField = ({
  name,
  addSubTask,
  setAddSubTask,
}: {
  name: string;
  addSubTask: string;
  setAddSubTask: any;
}) => {
  useEffect(() => setAddSubTask(name), []);
  return (
    <Input value={addSubTask} placeholder="Наименование" onChange={(e) => setAddSubTask(e.target.value)} />
  );
};

export default EditField;
