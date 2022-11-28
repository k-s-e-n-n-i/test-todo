import { IFProject, IFTask } from '../../redux/initState/InterfacesState';

export interface Props {
  task: IFTask;
  projects: IFProject[];
  currentProjectUpdated: any;
  commentsLoaded: any;
}
