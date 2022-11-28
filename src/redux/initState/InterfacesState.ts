export interface IFProjectState {
  projects: IFProject[];
  currentProject: IFProject | undefined;
  comments: IFComment[];
}

export interface IFProject {
  name: string;
  id: number;
  tasks: IFTask[];
}

export interface IFTask {
  projectId: number;
  numberTask: number;
  id: number;
  title: string;
  date: string;
  description: string;
  status: string;
  time: IFTime[];
  dateEnd: string;
  priority: string;
  subTasks: IFSubTask[];
  doneTask: boolean;
  files: IFFile[];
}

export interface IFTime {
  date: Date;
  timeStart: Date;
  timeEnd: Date;
}

export interface IFSubTask {
  name: string[];
  done: boolean;
  id: number;
}

export interface IFFile {
  nameFile: string;
  file: string | undefined;
}

export interface IFComment {
  id: number;
  idProject: number;
  idTask: number;
  idParent: number;
  text: string;
  date: string;
}
