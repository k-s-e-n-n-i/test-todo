import { IFFile } from '../../redux/initState/InterfacesState';

export interface Props {
  setFiles: any;
}

export interface State {
  files: IFFile[] | null;
}
