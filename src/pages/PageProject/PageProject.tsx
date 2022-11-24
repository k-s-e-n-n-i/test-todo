import React from 'react';
import './PageProject.scss';
import { Props } from './interfaces';
import Task from '../../components/Task/Task';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const PageProject = ({ currentProject, projects }: Props) => {
  let project = currentProject;
  if (!currentProject) {
    const idProjectPage = /project-([0-9]*)/.exec(window.location.pathname);
    if (idProjectPage) {
      project = projects.find((field) => field.id === Number(idProjectPage[1]));
    }
  }

  if (project) {
    return (
      <div className="page-project">
        <Breadcrumbs title={project.name} />

        <div className="page-project__tasks">
          {project.tasks ? project.tasks.map((task, i) => <Task {...task} key={i} />) : null}
        </div>
      </div>
    );
  }

  return null;
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(PageProject));
