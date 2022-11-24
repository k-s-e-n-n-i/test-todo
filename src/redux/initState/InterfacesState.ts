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
  project: string;
  id: number;
  title: string;
  date: string;
  description: string;
  status: string;
  time: string;
  dateEnd: string;
  priority: string;
}
