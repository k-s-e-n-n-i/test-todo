const ProjectsLoaded = (data: any) => ({ type: 'PROJECTS_LOADED', payload: data });
const CurrentProjectUpdated = (data: any) => ({ type: 'CURRENT_NAME_PROJECT_UPDATED', payload: data });
const CommentsLoaded = (data: any) => ({ type: 'COMMENTS_LOADED', payload: data });

export { ProjectsLoaded, CurrentProjectUpdated, CommentsLoaded };
