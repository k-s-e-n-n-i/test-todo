import { IFProject, IFTime } from '../initState/InterfacesState';

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

  addedTimeInWork = ({
    time,
    projects,
    currentProject,
    idTask,
    projectsLoaded,
  }: {
    time: IFTime | undefined;
    projects: IFProject[];
    currentProject: IFProject | undefined;
    idTask: number;
    projectsLoaded: any;
  }) => {
    if (time && currentProject) {
      const { date, timeStart, timeEnd } = time;
      const idx = projects.indexOf(currentProject);
      const tasks = projects[idx].tasks;
      const task = tasks.find((x) => x.id === idTask);

      if (task) {
        const idxTask = tasks.indexOf(task);
        const newTime = [...task.time, { date, timeStart, timeEnd }];

        const newTasks = [
          ...projects[idx].tasks.slice(0, idxTask),
          Object.assign({}, projects[idx].tasks[idxTask], { time: newTime }),
          ...projects[idx].tasks.slice(idxTask + 1),
        ];
        const result = [
          ...projects.slice(0, idx),
          Object.assign({}, projects[idx], { tasks: newTasks }),
          ...projects.slice(idx + 1),
        ];

        projectsLoaded(result);
        localStorage.setItem('TODO-list-projects', JSON.stringify(result));
      }
    }
  };

  addedSubTask = ({
    nameSubTask,
    projects,
    currentProject,
    idTask,
    projectsLoaded,
  }: {
    nameSubTask: string;
    projects: IFProject[];
    currentProject: IFProject | undefined;
    idTask: number;
    projectsLoaded: any;
  }) => {
    if (currentProject) {
      const idx = projects.indexOf(currentProject);
      const tasks = projects[idx].tasks;
      const task = tasks.find((x) => x.id === idTask);

      if (task) {
        const idxTask = tasks.indexOf(task);
        const newSubTask = [...task.subTasks, { name: nameSubTask, done: false, id: Date.now() }];

        const newTasks = [
          ...projects[idx].tasks.slice(0, idxTask),
          Object.assign({}, projects[idx].tasks[idxTask], { subTasks: newSubTask }),
          ...projects[idx].tasks.slice(idxTask + 1),
        ];
        const result = [
          ...projects.slice(0, idx),
          Object.assign({}, projects[idx], { tasks: newTasks }),
          ...projects.slice(idx + 1),
        ];

        projectsLoaded(result);
        localStorage.setItem('TODO-list-projects', JSON.stringify(result));
      }
    }
  };

  setStatusSubTask = ({
    doneSubTask,
    idSubTask,
    projects,
    currentProject,
    idTask,
    projectsLoaded,
  }: {
    doneSubTask: boolean;
    idSubTask: number;
    projects: IFProject[];
    currentProject: IFProject | undefined;
    idTask: number;
    projectsLoaded: any;
  }) => {
    if (currentProject) {
      const idx = projects.indexOf(currentProject);
      const tasks = projects[idx].tasks;
      const task = tasks.find((x) => x.id === idTask);

      if (task) {
        const idxTask = tasks.indexOf(task);
        const subTask = task.subTasks.find((x) => x.id === idSubTask);

        if (subTask) {
          const idxSubTask = task.subTasks.indexOf(subTask);
          const newSubTask = [
            ...task.subTasks.slice(0, idxSubTask),
            Object.assign({}, task.subTasks[idxSubTask], { done: doneSubTask }),
            ...task.subTasks.slice(idxSubTask + 1),
          ];

          const newTasks = [
            ...projects[idx].tasks.slice(0, idxTask),
            Object.assign({}, projects[idx].tasks[idxTask], { subTasks: newSubTask }),
            ...projects[idx].tasks.slice(idxTask + 1),
          ];
          const result = [
            ...projects.slice(0, idx),
            Object.assign({}, projects[idx], { tasks: newTasks }),
            ...projects.slice(idx + 1),
          ];

          projectsLoaded(result);
          localStorage.setItem('TODO-list-projects', JSON.stringify(result));
        }
      }
    }
  };

  setStatusTask = ({
    doneSubTask,
    idSubTask,
    projects,
    currentProject,
    idTask,
    projectsLoaded,
  }: {
    doneSubTask: boolean;
    idSubTask: number;
    projects: IFProject[];
    currentProject: IFProject | undefined;
    idTask: number;
    projectsLoaded: any;
  }) => {
    if (currentProject) {
      const idx = projects.indexOf(currentProject);
      const tasks = projects[idx].tasks;
      const task = tasks.find((x) => x.id === idTask);

      if (task) {
        const idxTask = tasks.indexOf(task);

        const newTasks = [
          ...tasks.slice(0, idxTask),
          Object.assign({}, task, { doneTask: !task.doneTask }),
          ...tasks.slice(idxTask + 1),
        ];
        const result = [
          ...projects.slice(0, idx),
          Object.assign({}, projects[idx], { tasks: newTasks }),
          ...projects.slice(idx + 1),
        ];

        projectsLoaded(result);
        localStorage.setItem('TODO-list-projects', JSON.stringify(result));
      }
    }
  };
}

export const Service = new ServiceRedux();
