import { IFProject } from '../initState/InterfacesState';

class ServiceRedux {
  getProjects = (projectsLoaded: any) => {
    const storageListProjects = localStorage.getItem('TODO-list-projects');
    if (storageListProjects) {
      projectsLoaded(JSON.parse(storageListProjects));
    }
  };

  definedCurrentProject = ({
    projects,
    currentProjectUpdated,
  }: {
    projects: IFProject[];
    currentProjectUpdated: any;
  }) => {
    let project = projects[0];
    const idProjectPage = /project-([0-9]*)/.exec(window.location.pathname);
    if (idProjectPage) {
      const finedProject = projects.find((field) => field.id === Number(idProjectPage[1]));
      if (finedProject) {
        project = finedProject;
        currentProjectUpdated(finedProject);
      }
    }

    return project;
  };

  savedTask = ({ projects, projectsLoaded, currentProject, updatedProject }: any) => {
    const idx = projects.indexOf(currentProject);
    projectsLoaded([...projects.slice(0, idx), updatedProject, ...projects.slice(idx + 1)]);
    localStorage.setItem(
      'TODO-list-projects',
      JSON.stringify([...projects.slice(0, idx), updatedProject, ...projects.slice(idx + 1)])
    );
  };
}

export const Service = new ServiceRedux();
