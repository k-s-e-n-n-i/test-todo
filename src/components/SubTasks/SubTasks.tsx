import React, { useState } from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { Checkbox, FormControlLabel, Button } from '@mui/material';
import EditForm from '../EditForm/EditForm';
import AddForm from '../AddForm/AddForm';
import Input from '../Input/Input';

const SubTasks = ({ task, currentProject, projects, projectsLoaded, idEditFieldUpdated }: Props) => {
  const { subTasks } = task;

  const [newSubTask, setNewSubTask] = useState('');
  const [showField, setShowField] = useState(false);

  return (
    <div>
      <h3>Подзадачи:</h3>
      {subTasks.map(({ name, done, id }, i) => (
        <EditForm
          key={i}
          id={id}
          contentMain={
            <FormControlLabel
              control={
                <Checkbox
                  checked={done}
                  onChange={(e) =>
                    Service.setStatusSubTask({
                      doneSubTask: e.target.checked,
                      idSubTask: id,
                      projects,
                      currentProject,
                      idTask: task.id,
                      projectsLoaded,
                    })
                  }
                />
              }
              label={name}
            />
          }
          contentEdit={
            <Input
              doFunc={() => setNewSubTask(name)}
              input={
                <input
                  value={newSubTask}
                  placeholder="Наименование"
                  onChange={(e) => setNewSubTask(e.target.value)}
                ></input>
              }
            />
          }
          canceled={() => setNewSubTask('')}
          saved={() => {
            Service.editField({
              keyData: 'subTasks',
              newData: { name: newSubTask, done, id },
              projects,
              currentProject,
              idTask: task.id,
              projectsLoaded,
              idxField: i,
            });
            setNewSubTask('');
          }}
          deleted={() =>
            Service.deletedField({
              keyData: 'subTasks',
              projects,
              currentProject,
              idTask: task.id,
              projectsLoaded,
              idxField: i,
            })
          }
        />
      ))}

      {showField ? (
        <AddForm
          content={
            <Input
              input={
                <input
                  value={newSubTask}
                  placeholder="Наименование"
                  onChange={(e) => setNewSubTask(e.target.value)}
                ></input>
              }
            />
          }
          saved={() => {
            Service.addedSubTask({
              nameSubTask: newSubTask,
              projects,
              currentProject,
              idTask: task.id,
              projectsLoaded,
            });
            setShowField(false);
            setNewSubTask('');
          }}
          canceled={() => {
            setShowField(false);
            setNewSubTask('');
          }}
        />
      ) : null}

      <Button
        onClick={() => {
          setShowField(true);
          setNewSubTask('');
          idEditFieldUpdated(0);
        }}
      >
        Добавить
      </Button>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(SubTasks));
