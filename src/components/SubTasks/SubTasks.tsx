import { useState } from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { Checkbox, FormControlLabel, Button, Input } from '@mui/material';
import EditForm from '../EditForm/EditForm';
import EditField from '../EditField/EditField';
import AddForm from '../AddForm/AddForm';

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
          buttonText="Ред"
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
          contentEdit={<EditField name={name} addSubTask={newSubTask} setAddSubTask={setNewSubTask} />}
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
              value={newSubTask}
              placeholder="Наименование"
              onChange={(e) => setNewSubTask(e.target.value)}
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
