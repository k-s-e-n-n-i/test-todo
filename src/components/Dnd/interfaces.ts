export interface Props {
  columns: IFDndColumn[];
  setColumns: any;
}

export interface IFDndColumn {
  title: string;
  items: any[];
}
