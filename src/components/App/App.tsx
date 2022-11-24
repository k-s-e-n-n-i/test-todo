import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageListProjects from '../../pages/PageListProjects/Page-ListProjects';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="app-container">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<PageListProjects />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
