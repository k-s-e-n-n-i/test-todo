import React, { useState, useEffect } from 'react';
import { Props } from './interfaces';
import './CommentsBlock.scss';
import { Input } from '@mui/material';
import ModalForm from '../ModalForm/ModalForm';
import { Service } from '../../redux/services/ServiceRedux';
import WithStore from '../../redux/hoc/WithStore';
import { connect } from 'react-redux';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { IFComment } from '../../redux/initState/InterfacesState';
import moment from 'moment';

const CommentsBlock = ({ comments, commentsLoaded, currentProject, idTask }: Props) => {
  const [idProject, setIdProject] = useState(0);
  const [addComment, setAddComment] = useState('');

  useEffect(() => {
    if (currentProject) {
      setIdProject(currentProject?.id);
    }
  }, [currentProject]);

  const inProject: IFComment[] = comments.filter((x) => x.idProject === idProject);
  const inTask: IFComment[] = inProject.filter((x) => x.idTask === idTask);
  const inTask0: IFComment[] = inTask.filter((x) => x.idParent === 0);

  const modalAddComment = (idParent: number) => {
    return (
      <ModalForm
        textButton="Добавить комментарий"
        saved={() => {
          Service.addedComment({
            comments,
            commentsLoaded,
            idProject,
            idTask,
            idParent,
            text: addComment,
          });
          setAddComment('');
        }}
        content={
          <div>
            <h3>Комментарий</h3>
            <Input
              value={addComment}
              placeholder="Текст комментария"
              onChange={(e) => setAddComment(e.target.value)}
            />
          </div>
        }
      />
    );
  };

  const commentBlock = (comment: IFComment) => {
    const { text, date, id } = comment;
    const children = inTask.filter((x) => x.idParent === id);

    return (
      <div className="comments__item">
        <span>{moment(date).format('HH:mm:ss DD.MM.YYYY')}</span>
        {modalAddComment(id)}
        <p>{text}</p>

        {children ? (
          <div className="comments__item-child">
            {children.map((item, i) => (
              <div key={i}>{commentBlock(item)}</div>
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="comments">
      <h3>Комментарии:</h3>
      {inTask0.map((item, i) => (
        <div key={i}>{commentBlock(item)}</div>
      ))}
      {modalAddComment(0)}
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(CommentsBlock));
