import { IFProjectState } from '../initState/InterfacesState';

export const MapStateToProps = ({ projects, currentProject, comments }: IFProjectState) => {
  return {
    projects,
    currentProject,
    comments,
  };
};
