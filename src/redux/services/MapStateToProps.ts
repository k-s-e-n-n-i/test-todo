import { IFProjectState } from '../initState/InterfacesState';

export const MapStateToProps = ({
  projects,
  currentProject,
  comments,
  modal,
  idEditField,
}: IFProjectState) => {
  return {
    projects,
    currentProject,
    comments,
    modal,
    idEditField,
  };
};
