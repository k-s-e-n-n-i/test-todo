export interface Props {
  listColumns: IFDndColumn[];
  getNewList: any;
}

export interface IFDndColumn {
  title: string;
  items: any[];
}
