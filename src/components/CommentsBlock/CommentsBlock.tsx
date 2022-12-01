import React, { useState, useEffect } from 'react';
import { Props } from './interfaces';
import './CommentsBlock.scss';
import { Button } from '@mui/material';
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
  const [showFormAddComment, setShowFormAddComment] = useState(0);

  useEffect(() => {
    if (currentProject) {
      setIdProject(currentProject?.id);
    }
  }, [currentProject]);

  const inProject: IFComment[] = comments.filter((x) => x.idProject === idProject);
  const inTask: IFComment[] = inProject.filter((x) => x.idTask === idTask);
  const inTask0: IFComment[] = inTask.filter((x) => x.idParent === 1);

  const buttonAddComment = (idParent: number) => {
    return (
      <img
        src={require('./img/add-comment.png')}
        alt="Добавить комментарий"
        className="comments__icon"
        onClick={() => {
          setShowFormAddComment(idParent);
        }}
      ></img>
    );
  };

  const formAddComment = (idParent: number) => {
    return (
      <div>
        <textarea
          value={addComment}
          placeholder="Текст комментария"
          onChange={(e) => setAddComment(e.target.value)}
          className="comments__textarea"
          maxLength={1000}
        />
        <p className="comments__symbols">{`Символов: ${1000 - addComment.length}`}</p>

        <div className="comments__buttons">
          <button
            className="my-button"
            onClick={() => {
              setAddComment('');
              setShowFormAddComment(0);
            }}
          >
            Отменить
          </button>
          <button
            className="my-button"
            onClick={() => {
              Service.addedComment({
                comments,
                commentsLoaded,
                idProject,
                idTask,
                idParent,
                text: addComment,
              });
              setAddComment('');
              setShowFormAddComment(0);
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    );
  };

  const commentBlock = (comment: IFComment) => {
    const { text, date, id } = comment;
    const children = inTask.filter((x) => x.idParent === id);

    return (
      <div className="comments__item">
        <div className="comments__title">
          <span>{moment(date).format('HH:mm:ss DD.MM.YYYY')}</span>
          {buttonAddComment(id)}
        </div>
        <p>{text}</p>
        {showFormAddComment === id ? formAddComment(id) : null}

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

      <Button onClick={() => setShowFormAddComment(1)}>Добавить комментарий</Button>
      {showFormAddComment === 1 ? formAddComment(1) : null}
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(CommentsBlock));
