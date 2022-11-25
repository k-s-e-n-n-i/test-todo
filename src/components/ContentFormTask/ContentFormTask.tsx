import React, { useEffect, useState } from 'react';
import { IFStateTask, Props } from './interfaces';
import './ContentFormTask.scss';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { Input, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { StatutesTexts, PriorityTexts } from '../../redux/services/Constants';
import moment from 'moment';
import { IFTask } from '../../redux/initState/InterfacesState';

const defaultDataForm: IFStateTask = {
  id: 0,
  title: '',
  description: '',
  dateEnd: null,
  status: '0',
  time: { hour: '', minutes: '' },
  priority: '0',
};

const ContentFormTask = ({ project, setUpdatedProject, editData }: Props) => {
  const startData: IFStateTask = editData ? editData : defaultDataForm;

  const [title, setTitle] = useState(startData.title);
  const [description, setDescription] = useState(startData.description);
  const [dateEndPicker, setDateEndPicker] = useState<Dayjs | null>(
    startData.dateEnd ? dayjs(new Date(startData.dateEnd)) : null
  );
  const [dateEnd, setDateEnd] = useState(startData.dateEnd ? new Date(startData.dateEnd).toDateString() : '');
  const [status, setStatus] = useState(startData.status);
  const [timeH, setTimeH] = useState(startData.time.hour);
  const [timeM, setTimeM] = useState(startData.time.minutes);
  const [priority, setPriority] = useState(startData.priority);

  useEffect(() => {
    const addTasks = [
      ...project.tasks,
      {
        projectId: project.id,
        id: Date.now(),
        title,
        date: moment(new Date()).format('DD.MM.YYYY HH:mm:ss'),
        description,
        status: StatutesTexts[Number(status)],
        time: { hour: timeH, minutes: timeM },
        dateEnd,
        priority: PriorityTexts[Number(priority)],
      },
    ];

    let editTasks: IFTask[] = [];
    let idxEditTask = 0;
    if (editData) {
      const editTask = project.tasks.find((field) => field.id === editData.id);
      if (editTask) {
        idxEditTask = project.tasks.indexOf(editTask);
        editTasks = [
          ...project.tasks.slice(0, idxEditTask),
          {
            projectId: project.id,
            id: editTask.id,
            title,
            date: editTask.date,
            description,
            status: StatutesTexts[Number(status)],
            time: { hour: timeH, minutes: timeM },
            dateEnd,
            priority: PriorityTexts[Number(priority)],
          },
          ...project.tasks.slice(idxEditTask + 1),
        ];
      }
    }

    setUpdatedProject({
      id: project.id,
      name: project.name,
      tasks: editData ? editTasks : addTasks,
    });
  }, [title, description, dateEnd, status, timeH, timeM, priority]);

  return (
    <div className="content-form-task">
      <div className="content-form-task__line">
        <InputLabel>Заголовок:</InputLabel>
        <Input value={title} placeholder="Заголовок" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="content-form-task__line">
        <InputLabel>Описание:</InputLabel>
        <Input value={description} placeholder="Описание" onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="content-form-task__line">
        <InputLabel>Статус:</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value={0}>Queue</MenuItem>
          <MenuItem value={1}>Development</MenuItem>
          <MenuItem value={2}>Done</MenuItem>
        </Select>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
        <DatePicker
          label="дата окончания"
          value={dateEndPicker}
          inputFormat="DD.MM.YYYY"
          onChange={(newValue) => {
            setDateEndPicker(newValue);
            setDateEnd(newValue ? newValue.format('YYYY-MM-DD') : new Date().toDateString());
          }}
          renderInput={(params) => <TextField {...params} />}
          className="content-form-task__datepicker"
        />
      </LocalizationProvider>

      <div className="content-form-task__line">
        <InputLabel id="select-priority-label-from">Приоритет:</InputLabel>
        <Select
          labelId="select-priority-label-from"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value={0}>Низкий</MenuItem>
          <MenuItem value={1}>Средний</MenuItem>
          <MenuItem value={2}>Высокий</MenuItem>
        </Select>
      </div>

      <div className="content-form-task__line">
        <InputLabel>Время в работе:</InputLabel>
        <div className="content-form-task__time">
          <div>
            <Input
              value={timeH}
              placeholder="Время в работе, часы"
              onChange={(e) => setTimeH(e.target.value)}
              className="content-form-task__work-time"
            />
            <span>ч.</span>
          </div>
          <div>
            <Input
              value={timeM}
              placeholder="Время в работе, минуты"
              onChange={(e) => setTimeM(e.target.value)}
              className="content-form-task__work-time"
            />
            <span>мин.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(ContentFormTask));
