export interface IFProjectState {
  projects: IFProject[];
  currentProject: IFProject | undefined;
}

export interface IFProject {
  name: string;
  id: number;
  tasks: IFTask[];
}

export interface IFTask {
  projectId: number;
  id: number;
  title: string;
  date: string;
  description: string;
  status: string;
  time: IFTime[];
  dateEnd: string;
  priority: string;
  subTasks: string[];
}

export interface IFTime {
  date: Date;
  timeStart: Date;
  timeEnd: Date;
}
