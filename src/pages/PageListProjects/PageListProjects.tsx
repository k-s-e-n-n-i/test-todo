import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';

import { Props } from './interfaces';
import './PageListProjects.scss';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ModalForm from '../../components/ModalForm/ModalForm';
import EditForm from '../../components/EditForm/EditForm';
import { Service } from '../../redux/services/ServiceRedux';
import Input from '../../components/Input/Input';

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
          contentMain={
            <Link to={`/project-${proj.id}`} onClick={() => currentProjectUpdated(proj)}>
              {proj.name}
            </Link>
          }
          contentEdit={
            <Input
              input={
                <input
                  value={nameNewProject}
                  placeholder="Наименование"
                  onChange={(e) => setNameNewProject(e.target.value)}
                ></input>
              }
            />
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
        content={
          <Input
            input={
              <input placeholder="Наименование" onChange={(e) => setNameNewProject(e.target.value)}></input>
            }
          />
        }
        saved={() => savedProject()}
        id="addProject"
      />
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(PageListProjects));
