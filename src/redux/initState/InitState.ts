import { IFProjectState } from './InterfacesState';

export const ProjectState: IFProjectState = {
  projects: [],
  currentProject: { name: '', id: 0, tasks: [] },
  comments: [],
  modal: '',
  idEditField: 0,
};
