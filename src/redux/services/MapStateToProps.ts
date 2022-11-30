import { IFProjectState } from '../initState/InterfacesState';

export const MapStateToProps = ({ projects, currentProject, comments, modal }: IFProjectState) => {
  return {
    projects,
    currentProject,
    comments,
    modal,
  };
};
