import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageListProjects from '../../pages/PageListProjects/PageListProjects';
import PageProject from '../../pages/PageProject/PageProject';
import { Service } from '../../redux/services/ServiceRedux';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import './App.scss';
import { IFProject } from '../../redux/initState/InterfacesState';

const App = ({
  projectsLoaded,
  commentsLoaded,
  projects,
}: {
  projectsLoaded: any;
  commentsLoaded: any;
  projects: IFProject[];
}) => {
  useEffect(() => {
    Service.getProjects(projectsLoaded);
    Service.getComments(commentsLoaded);
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="app-container">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<PageListProjects />} />
              <Route path="/project-:id" element={projects.length !== 0 ? <PageProject /> : null} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(App));
