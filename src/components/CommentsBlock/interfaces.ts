import { IFComment, IFProject } from '../../redux/initState/InterfacesState';

export interface Props {
  comments: IFComment[];
  commentsLoaded: any;
  currentProject: IFProject | undefined;
  idTask: number;
}
