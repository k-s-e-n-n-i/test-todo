import { IFProject, IFTask } from '../../redux/initState/InterfacesState';

export interface Props {
  task: IFTask;
  currentProject: IFProject | undefined;
  projects: IFProject[];
  projectsLoaded: any;
}
