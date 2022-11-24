import { ProjectState } from '../initState/InitState';

const reducer = (state: any = ProjectState, action: { type: string; payload: object }) => {
  switch (action.type) {
    case 'PROJECTS_LOADED':
      return { ...state, projects: action.payload };

    default:
      return state;
  }
};

export default reducer;
