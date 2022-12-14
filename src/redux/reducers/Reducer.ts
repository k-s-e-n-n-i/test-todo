import { ProjectState } from '../initState/InitState';

const reducer = (state: any = ProjectState, action: { type: string; payload: object }) => {
  switch (action.type) {
    case 'PROJECTS_LOADED':
      return { ...state, projects: action.payload };
    case 'CURRENT_NAME_PROJECT_UPDATED':
      return { ...state, currentProject: action.payload };
    case 'COMMENTS_LOADED':
      return { ...state, comments: action.payload };
    case 'MODAL_UPDATED':
      return { ...state, modal: action.payload };
    case 'ID_EDIT_FIELD_UPDATED':
      return { ...state, idEditField: action.payload };

    default:
      return state;
  }
};

export default reducer;
