import { IFProject } from '../../redux/initState/InterfacesState';

export interface Props {
  currentProject: IFProject | undefined;
  projects: IFProject[];
  projectsLoaded: any;
  currentProjectUpdated: any;
  modal: string;
  modalUpdated: any;
}
