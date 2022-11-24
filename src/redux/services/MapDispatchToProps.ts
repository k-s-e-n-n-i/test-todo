import { bindActionCreators } from 'redux';
import { ProjectsLoaded } from '../actions/Actions';

export const MapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      projectsLoaded: ProjectsLoaded,
    },
    dispatch
  );
};
