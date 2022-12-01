import React, { useState } from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import EditForm from '../EditForm/EditForm';
import AddForm from '../AddForm/AddForm';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';

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
            <Checkbox
              label={name}
              checked={done}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
          edited={() => setShowField(false)}
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

      <button
        type="button"
        className="my-button"
        onClick={() => {
          setShowField(true);
          setNewSubTask('');
          idEditFieldUpdated(0);
        }}
      >
        Добавить
      </button>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(SubTasks));
