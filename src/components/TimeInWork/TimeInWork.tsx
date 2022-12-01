import React, { useEffect } from 'react';
import './TimeInWork.scss';
import { Props } from './interfaces';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
require('dayjs/locale/ru');
dayjs.locale('ru');

const TimeInWork = ({ setTime, editTimeStart, editTimeEnd }: Props) => {
  const [timeStart, setTimeStart] = React.useState<Dayjs | null>(editTimeStart ? dayjs(editTimeStart) : null);
  const [timeEnd, setTimeEnd] = React.useState<Dayjs | null>(editTimeEnd ? dayjs(editTimeEnd) : null);

  useEffect(() => {
    setTime({
      timeStart,
      timeEnd,
      id: Date.now(),
    });
  }, [timeStart, timeEnd]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
      <div className="time-in-work">
        <DateTimePicker
          label="начало"
          value={timeStart}
          onChange={(newValue) => {
            setTimeStart(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          className="time-in-work__picker"
        />

        <DateTimePicker
          label="окончание"
          value={timeEnd}
          onChange={(newValue) => {
            setTimeEnd(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          className="time-in-work__picker"
        />
      </div>
    </LocalizationProvider>
  );
};

export default TimeInWork;
