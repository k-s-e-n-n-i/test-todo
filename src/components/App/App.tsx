import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageListProjects from '../../pages/PageListProjects/PageListProjects';
import PageProject from '../../pages/PageProject/PageProject';
import { Service } from '../../redux/services/ServiceRedux';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';
import './App.scss';

const App = ({ projectsLoaded, commentsLoaded }: { projectsLoaded: any; commentsLoaded: any }) => {
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
              <Route path="/project-:id" element={<PageProject />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(App));
