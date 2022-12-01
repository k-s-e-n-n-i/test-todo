import { bindActionCreators } from 'redux';
import {
  CommentsLoaded,
  CurrentProjectUpdated,
  IdEditFieldUpdated,
  ModalUpdated,
  ProjectsLoaded,
} from '../actions/Actions';

export const MapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      projectsLoaded: ProjectsLoaded,
      currentProjectUpdated: CurrentProjectUpdated,
      commentsLoaded: CommentsLoaded,
      modalUpdated: ModalUpdated,
      idEditFieldUpdated: IdEditFieldUpdated,
    },
    dispatch
  );
};
