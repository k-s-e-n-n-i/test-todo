import { useState } from 'react';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import { IFTime } from '../../redux/initState/InterfacesState';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import moment from 'moment';
import TimeInWork from '../TimeInWork/TimeInWork';
import EditForm from '../EditForm/EditForm';
import { Button } from '@mui/material';
import AddForm from '../AddForm/AddForm';

const TaskTime = ({ task, currentProject, projects, projectsLoaded, idEditFieldUpdated }: Props) => {
  const { id, time } = task;

  const [addTime, setAddTime] = useState<IFTime>();
  const [showField, setShowField] = useState(false);

  let sumMin: any = 0;
  time.forEach(({ timeStart, timeEnd }, i) => {
    sumMin += (new Date(timeEnd).getTime() - new Date(timeStart).getTime()) / 1000 / 60;
  });
  const hour = Math.floor(sumMin / 60);
  const minutes = Math.floor(sumMin - hour * 60);

  return (
    <div>
      <h3>{`Время в работе: ${hour} ч. ${minutes} мин.`}</h3>
      {time.map(({ timeStart, timeEnd, id }, i) => (
        <EditForm
          key={i}
          id={id}
          buttonText="Ред"
          deleted={() =>
            Service.deletedField({
              keyData: 'time',
              projects,
              currentProject,
              idTask: task.id,
              projectsLoaded,
              idxField: i,
            })
          }
          contentMain={
            <p>
              {`с ${moment(new Date(timeStart)).format('DD.MM.YY HH:mm')} до ${moment(
                new Date(timeEnd)
              ).format('DD.MM.YY HH:mm')}`}
            </p>
          }
          contentEdit={<TimeInWork setTime={setAddTime} editTimeStart={timeStart} editTimeEnd={timeEnd} />}
          saved={() => {
            Service.editField({
              keyData: 'time',
              newData: addTime,
              projects,
              currentProject,
              idTask: task.id,
              projectsLoaded,
              idxField: i,
            });
          }}
        />
      ))}

      {showField ? (
        <AddForm
          content={<TimeInWork setTime={setAddTime} />}
          saved={() => {
            Service.addedTimeInWork({
              time: addTime,
              projects,
              currentProject,
              idTask: id,
              projectsLoaded,
            });
            setShowField(false);
          }}
          canceled={() => setShowField(false)}
        />
      ) : null}

      <Button
        onClick={() => {
          setShowField(true);

          idEditFieldUpdated(0);
        }}
      >
        Добавить
      </Button>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(TaskTime));
