import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';

import { Props } from './interfaces';
import './PageListProjects.scss';

import { Input } from '@mui/material';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ModalForm from '../../components/ModalForm/ModalForm';
import EditForm from '../../components/EditForm/EditForm';
import EditField from '../../components/EditField/EditField';
import { Service } from '../../redux/services/ServiceRedux';

const PageListProjects = ({ projects, projectsLoaded, currentProjectUpdated }: Props) => {
  const [nameNewProject, setNameNewProject] = useState('');

  const savedProject = () => {
    const newList = [...projects, { id: Date.now(), name: nameNewProject, tasks: [] }];
    projectsLoaded(newList);
    localStorage.setItem('TODO-list-projects', JSON.stringify(newList));
  };

  return (
    <div className="page-list-projects">
      <Breadcrumbs />

      {projects.map((proj, i) => (
        <EditForm
          key={i}
          id={proj.id}
          buttonText="Ред"
          contentMain={
            <Link to={`/project-${proj.id}`} onClick={() => currentProjectUpdated(proj)}>
              {proj.name}
            </Link>
          }
          contentEdit={
            <EditField name={proj.name} addSubTask={nameNewProject} setAddSubTask={setNameNewProject} />
          }
          saved={() => {
            Service.editProject({
              projects,
              projectsLoaded,
              idx: i,
              newName: nameNewProject,
            });
            setNameNewProject('');
          }}
          deleted={() =>
            Service.deletedProject({
              projects,
              projectsLoaded,
              idx: i,
            })
          }
        />
      ))}

      <ModalForm
        textButton="Добавить проект"
        content={<Input placeholder="Наименование" onChange={(e) => setNameNewProject(e.target.value)} />}
        saved={() => savedProject()}
        id="addProject"
      />
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(PageListProjects));
