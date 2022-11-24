import { IFProjectState } from '../initState/InterfacesState';

export const MapStateToProps = ({ projects }: IFProjectState) => {
  return {
    projects,
  };
};
