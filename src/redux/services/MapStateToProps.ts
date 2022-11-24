import { IFProjectState } from '../initState/InterfacesState';

export const MapStateToProps = ({ projects, currentProject }: IFProjectState) => {
  return {
    projects,
    currentProject,
  };
};
