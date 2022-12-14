import React, { useEffect, useState } from 'react';
import { IFStateTask, Props } from './interfaces';
import './ContentFormTask.scss';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { TextField, Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { StatutesTexts, PriorityTexts } from '../../redux/services/Constants';
import moment from 'moment';
import { IFTask } from '../../redux/initState/InterfacesState';
import { Editor } from '@tinymce/tinymce-react';
import Input from '../Input/Input';

const defaultDataForm: IFStateTask = {
  id: '0',
  title: '',
  description: '',
  dateEnd: null,
  status: '0',
  time: [],
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
  const [priority, setPriority] = useState(startData.priority);

  useEffect(() => {
    const addTasks = [
      ...project.tasks,
      {
        projectId: project.id,
        id: Date.now().toString(),
        numberTask: project.tasks.length + 1,
        title,
        date: moment(new Date()).format('DD.MM.YYYY HH:mm:ss'),
        description,
        status: StatutesTexts[Number(status)],
        time: [],
        dateEnd,
        priority: PriorityTexts[Number(priority)],
        subTasks: [],
        files: [],
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
            numberTask: editTask.numberTask,
            title,
            date: editTask.date,
            description,
            status: StatutesTexts[Number(status)],
            time: editTask.time,
            dateEnd,
            priority: PriorityTexts[Number(priority)],
            subTasks: editTask.subTasks,
            files: editTask.files,
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
  }, [title, description, dateEnd, status, priority]);

  return (
    <div className="content-form-task">
      <div className="content-form-task__line">
        <label className="my-label">??????????????????:</label>
        <Input
          width="50%"
          input={
            <input value={title} placeholder="??????????????????" onChange={(e) => setTitle(e.target.value)}></input>
          }
        />
      </div>

      <div className="content-form-task__line">
        <label className="my-label">????????????:</label>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value={0}>Queue</MenuItem>
          <MenuItem value={1}>Development</MenuItem>
          <MenuItem value={2}>Done</MenuItem>
        </Select>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
        <div className="content-form-task__line">
          <label className="my-label">???????? ??????????????????:</label>
          <DatePicker
            label="???????? ??????????????????"
            value={dateEndPicker}
            inputFormat="DD.MM.YYYY"
            onChange={(newValue) => {
              setDateEndPicker(newValue);
              setDateEnd(newValue ? newValue.format('YYYY-MM-DD') : new Date().toDateString());
            }}
            renderInput={(params) => <TextField {...params} />}
            className="content-form-task__datepicker"
          />
        </div>
      </LocalizationProvider>

      <div className="content-form-task__line">
        <label className="my-label">??????????????????:</label>
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <MenuItem value={0}>????????????</MenuItem>
          <MenuItem value={1}>??????????????</MenuItem>
          <MenuItem value={2}>??????????????</MenuItem>
        </Select>
      </div>

      <label className="my-label">????????????????:</label>
      <Editor value={description} onEditorChange={(e) => setDescription(e)} />
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(ContentFormTask));
