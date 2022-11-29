import { IFComment, IFFile, IFProject, IFTask, IFTime } from '../initState/InterfacesState';

class ServiceRedux {
  getProjects = (projectsLoaded: any) => {
    const storageListProjects = localStorage.getItem('TODO-list-projects');
    if (storageListProjects) {
      projectsLoaded(JSON.parse(storageListProjects));
    }
  };

  getComments = (commentsLoaded: any) => {
    const storageListComments = localStorage.getItem('TODO-list-comments');
    if (storageListComments) {
      commentsLoaded(JSON.parse(storageListComments));
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
    idTask: string;
    projectsLoaded: any;
  }) => {
    if (time) {
      const { date, timeStart, timeEnd } = time;
      this.updatedTask({
        newData: { date, timeStart, timeEnd },
        keyData: 'time',
        projects,
        currentProject,
        idTask,
        projectsLoaded,
      });
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
    idTask: string;
    projectsLoaded: any;
  }) => {
    this.updatedTask({
      newData: { name: nameSubTask, done: false, id: Date.now() },
      keyData: 'subTasks',
      projects,
      currentProject,
      idTask,
      projectsLoaded,
    });
  };

  updatedTask = ({
    newData,
    keyData,
    projects,
    currentProject,
    idTask,
    projectsLoaded,
  }: {
    newData: any;
    keyData: 'subTasks' | 'time';
    projects: IFProject[];
    currentProject: IFProject | undefined;
    idTask: string;
    projectsLoaded: any;
  }) => {
    if (currentProject) {
      const { idx, tasks, task } = this.findTask({ projects, currentProject, idTask });

      if (task) {
        const idxTask = tasks.indexOf(task);
        const newArrData = [...task[keyData], newData];

        const newTasks = [
          ...projects[idx].tasks.slice(0, idxTask),
          Object.assign({}, projects[idx].tasks[idxTask], { [keyData]: newArrData }),
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

  findTask = ({
    projects,
    currentProject,
    idTask,
  }: {
    projects: IFProject[];
    currentProject: IFProject;
    idTask: string;
  }) => {
    const idx = projects.indexOf(currentProject);
    const tasks = projects[idx].tasks;
    const task = tasks.find((x) => x.id === idTask);

    return { idx, tasks, task };
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
    idTask: string;
    projectsLoaded: any;
  }) => {
    if (currentProject) {
      const { idx, tasks, task } = this.findTask({ projects, currentProject, idTask });

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
    newStatus,
    projects,
    currentProject,
    idTask,
    projectsLoaded,
  }: {
    newStatus: string;
    projects: IFProject[];
    currentProject: IFProject | undefined;
    idTask: string;
    projectsLoaded: any;
  }) => {
    if (currentProject) {
      const { idx, tasks, task } = this.findTask({ projects, currentProject, idTask });

      if (task) {
        const idxTask = tasks.indexOf(task);

        const newTasks = [
          ...tasks.slice(0, idxTask),
          Object.assign({}, task, { status: newStatus }),
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

  uploadFiles = ({
    addFiles,
    projects,
    currentProject,
    idTask,
    projectsLoaded,
  }: {
    addFiles: IFFile[] | null;
    projects: IFProject[];
    currentProject: IFProject | undefined;
    idTask: string;
    projectsLoaded: any;
  }) => {
    if (currentProject && addFiles) {
      const { idx, tasks, task } = this.findTask({ projects, currentProject, idTask });

      if (task) {
        const idxTask = tasks.indexOf(task);

        const newTasks = [
          ...tasks.slice(0, idxTask),
          Object.assign({}, task, { files: [...task.files, ...addFiles] }),
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

  searchTask = ({ search, tasks }: { search: string; tasks: IFTask[] }) => {
    const arrByTitle = tasks.filter((x) => x.title.includes(search));
    const arrByNumber = tasks.filter((x) => x.numberTask.toString().includes(search));

    return [...arrByTitle, ...arrByNumber];
  };

  addedComment = ({
    commentsLoaded,
    idProject,
    idTask,
    idParent,
    text,
    comments,
  }: {
    commentsLoaded: any;
    idProject: number;
    idTask: number;
    idParent: number;
    text: string;
    comments: IFComment[];
  }) => {
    const newComment = { id: Date.now(), idProject, idTask, idParent, text, date: new Date().toString() };
    commentsLoaded([...comments, newComment]);
    localStorage.setItem('TODO-list-comments', JSON.stringify([...comments, newComment]));
  };
}

export const Service = new ServiceRedux();
