import { useState } from 'react';
import './TaskFiles.scss';
import { Props } from './interfaces';
import { Service } from '../../redux/services/ServiceRedux';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import { Button } from '@mui/material';
import FileUpload from '../FileUpload/FileUpload';
import { IFFile } from '../../redux/initState/InterfacesState';
import AddForm from '../AddForm/AddForm';

const TaskFiles = ({ task, currentProject, projects, projectsLoaded }: Props) => {
  const { id, files } = task;

  const [addFiles, setFiles] = useState<IFFile[] | null>(null);
  const [showInputFile, setShowInputFile] = useState(false);

  return (
    <div className="task-files">
      <h3>Файлы:</h3>
      {files.map((item, i) => (
        <div key={i} className="task-files__item">
          <a href={item.file} download={item.nameFile} target="_blank" rel="noreferrer">
            {item.nameFile}
          </a>
          <img
            src={require('./img/delete.png')}
            alt="удалить"
            className="task-files__icon"
            onClick={() =>
              Service.deletedField({
                keyData: 'files',
                projects,
                currentProject,
                idTask: id,
                projectsLoaded,
                idxField: i,
              })
            }
          ></img>
        </div>
      ))}

      {showInputFile ? (
        <AddForm
          content={<FileUpload setFiles={setFiles} />}
          saved={() => {
            Service.uploadFiles({
              addFiles,
              projects,
              currentProject,
              idTask: id,
              projectsLoaded,
            });
            setShowInputFile(false);
            setFiles(null);
          }}
          canceled={() => {
            setShowInputFile(false);
            setFiles(null);
          }}
        />
      ) : null}

      <Button onClick={() => setShowInputFile(true)}>Добавить</Button>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(TaskFiles));
