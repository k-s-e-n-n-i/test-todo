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
        <Link to={`/project-${proj.id}`} onClick={() => currentProjectUpdated(proj)} key={i}>
          {proj.name}
        </Link>
      ))}

      <ModalForm
        textButton="Добавить проект"
        content={<Input placeholder="Наименование" onChange={(e) => setNameNewProject(e.target.value)} />}
        saved={() => savedProject()}
      />
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(PageListProjects));
