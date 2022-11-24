import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WithStore from '../../redux/hoc/WithStore';
import { MapStateToProps } from '../../redux/services/MapStateToProps';
import { MapDispatchToProps } from '../../redux/services/MapDispatchToProps';

import { Props } from './interfaces';
import './PageListProjects.scss';

import { Box, Button, Modal, Input, Grid } from '@mui/material';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const PageListProjects = ({ projects, projectsLoaded, currentProjectUpdated }: Props) => {
  const [nameNewProject, setNameNewProject] = useState('');

  const [open, setOpen] = useState(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #eee',
    boxShadow: 2,
    pt: 2,
    px: 4,
    pb: 3,
  };

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

      <button onClick={() => setOpen(true)}>Добавить проект</button>

      <Modal
        hideBackdrop
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Input placeholder="Наименование" onChange={(e) => setNameNewProject(e.target.value)} />

          <Grid container sx={{ marginTop: '10px' }}>
            <Grid item xs={12} md={6}>
              <Button onClick={() => setOpen(false)}>Отменить</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                onClick={() => {
                  setOpen(false);
                  savedProject();
                }}
              >
                Сохранить
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(PageListProjects));
