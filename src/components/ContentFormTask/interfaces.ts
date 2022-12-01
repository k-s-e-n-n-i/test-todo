import { IFProject, IFTime } from '../../redux/initState/InterfacesState';

export interface Props {
  project: IFProject;
  setUpdatedProject: any;
  editData?: IFStateTask;
}

export interface IFStateTask {
  id: string;
  title: string;
  description: string;
  dateEnd: string | null;
  status: string;
  time: IFTime[];
  priority: string;
}
