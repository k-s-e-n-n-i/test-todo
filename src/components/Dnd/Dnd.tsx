import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Props } from './interfaces';
import './Dnd.scss';
import './Dnd-media.scss';
import styled from '@emotion/styled';
import TaskShort from '../TaskShort/TaskShort';

const Dnd = ({ columns, setColumns }: Props) => {
  const TaskColumnStyles = styled.div`
    margin: 8px;
    display: flex;
    width: 100%;
    min-height: 80vh;
  `;

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns(
        Object.values({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        })
      );
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns(
        Object.values({
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        })
      );
    }
  };

  return (
    <div className="dnd">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        <div className="dnd__container">
          <TaskColumnStyles>
            {Object.entries(columns).map(([columnId, column]) => {
              return (
                <Droppable key={columnId.toString()} droppableId={columnId.toString()}>
                  {(provided) => (
                    <div className="dnd__task-list" ref={provided.innerRef} {...provided.droppableProps}>
                      <p className="dnd__title">{column.title}</p>
                      {column.items.map((item, index) => (
                        <TaskCard key={item.id} item={item} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </TaskColumnStyles>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dnd;

const TaskCard = ({ item, index }: any) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="dnd__task-information">
            <TaskShort task={item} />
          </div>
        </div>
      )}
    </Draggable>
  );
};
