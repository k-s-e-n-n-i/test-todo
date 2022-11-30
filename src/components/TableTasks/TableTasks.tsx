import React from 'react';
import { Props } from './interfaces';
import './TableTasks.scss';
import './TableTasks-media.scss';
import styled from '@emotion/styled';
import TaskShort from '../TaskShort/TaskShort';

const TableTasks = ({ listColumns, getNewList }: Props) => {
  const TaskColumnStyles = styled.div`
    margin: 8px;
    display: flex;
    width: 100%;
    min-height: 80vh;
  `;

  return (
    <div className="table-tasks">
      <h3>Без dnd</h3>
      <div className="table-tasks__container">
        <TaskColumnStyles>
          {listColumns.map((column, i) => (
            <div className="table-tasks__task-list" key={i}>
              <p className="table-tasks__title">{column.title}</p>
              {column.items.map((item, idx) => (
                <div className="table-tasks__task-information" key={idx}>
                  <TaskShort task={item} />
                </div>
              ))}
            </div>
          ))}
        </TaskColumnStyles>
      </div>
    </div>
  );
};

export default TableTasks;
