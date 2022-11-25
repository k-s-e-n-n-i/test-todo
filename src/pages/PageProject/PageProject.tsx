import React, { useState } from 'react';
import './PageProject.scss';
import { Props } from './interfaces';
import Task from '../../components/Task/Task';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ModalForm from '../../components/ModalForm/ModalForm';
import { IFProject } from '../../redux/initState/InterfacesState';
import ContentFormTask from '../../components/ContentFormTask/ContentFormTask';
import { Service } from '../../redux/services/ServiceRedux';

const PageProject = ({ currentProject, projects, projectsLoaded, currentProjectUpdated }: Props) => {
  Service.definedCurrentProject({ projects, currentProjectUpdated });

  const [updatedProject, setUpdatedProject] = useState<IFProject>();

  if (currentProject) {
    return (
      <div className="page-project">
        <Breadcrumbs title={currentProject.name} />

        <div className="page-project__tasks">
          {currentProject.tasks ? currentProject.tasks.map((task, i) => <Task task={task} key={i} />) : null}
        </div>

        <ModalForm
          textButton="Добавить задачу"
          saved={() => Service.savedTask({ projects, projectsLoaded, currentProject, updatedProject })}
          content={<ContentFormTask project={currentProject} setUpdatedProject={setUpdatedProject} />}
        />
      </div>
    );
  }

  return null;
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(PageProject));
