import React, { useState, useEffect } from 'react';
import './TimeInWork.scss';
import { Props } from './interfaces';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';

const TimeInWork = ({ setTime }: Props) => {
  const [dateWorkPicker, setDateWorkPicker] = useState<Dayjs | null>(dayjs(new Date()));
  const [dateWork, setDateWork] = useState(new Date().toDateString());
  const [timeStart, setTimeStart] = React.useState<Dayjs | null>(null);
  const [timeEnd, setTimeEnd] = React.useState<Dayjs | null>(null);

  useEffect(() => setTime({ date: dateWork, timeStart, timeEnd }), [dateWork, timeStart, timeEnd]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
      <DatePicker
        label="дата"
        value={dateWorkPicker}
        inputFormat="DD.MM.YYYY"
        onChange={(newValue) => {
          setDateWorkPicker(newValue);
          setDateWork(newValue ? newValue.format('YYYY-MM-DD') : new Date().toDateString());
        }}
        renderInput={(params) => <TextField {...params} />}
        className="time-in-work"
      />

      <TimePicker
        label="начало"
        value={timeStart}
        onChange={(newValue) => {
          setTimeStart(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        className="time-in-work"
      />

      <TimePicker
        label="окончание"
        value={timeEnd}
        onChange={(newValue) => {
          setTimeEnd(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        className="time-in-work"
      />
    </LocalizationProvider>
  );
};

export default TimeInWork;
