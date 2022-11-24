import React from 'react';
import { IFTask } from '../../redux/initState/InterfacesState';
import './Task.scss';

const Task = ({ id, title, date, description, status, time, dateEnd, priority }: IFTask) => {
  return (
    <div className="task">
      <h2>{`${id}. ${title}`}</h2>
      <p>{`Создано: ${date}`}</p>
      <p>{`Статус: ${status}`}</p>

      <p>{`Время в работе: ${time}`}</p>
      <p>{`Дата окончания: ${dateEnd}`}</p>
      <p>{`Приоритет: ${priority}`}</p>

      <p>{description}</p>

      <div>files</div>
      <button>Добавить подзадачу</button>
      <div>Комментарии....</div>
    </div>
  );
};

export default Task;
