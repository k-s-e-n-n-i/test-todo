import { bindActionCreators } from 'redux';
import { CommentsLoaded, CurrentProjectUpdated, ModalUpdated, ProjectsLoaded } from '../actions/Actions';

export const MapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      projectsLoaded: ProjectsLoaded,
      currentProjectUpdated: CurrentProjectUpdated,
      commentsLoaded: CommentsLoaded,
      modalUpdated: ModalUpdated,
    },
    dispatch
  );
};
