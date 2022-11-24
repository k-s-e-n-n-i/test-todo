class ServiceRedux {
  getProjects(projectsLoaded: any) {
    const storageListProjects = localStorage.getItem('TODO-list-projects');
    if (storageListProjects) {
      projectsLoaded(JSON.parse(storageListProjects));
    }
  }
}

export const Service = new ServiceRedux();
