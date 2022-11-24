import { bindActionCreators } from 'redux';
import { CurrentProjectUpdated, ProjectsLoaded } from '../actions/Actions';

export const MapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      projectsLoaded: ProjectsLoaded,
      currentProjectUpdated: CurrentProjectUpdated,
    },
    dispatch
  );
};
