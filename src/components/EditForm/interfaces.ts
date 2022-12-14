import { ReactElement } from 'react';

export interface Props {
  contentEdit: ReactElement | null;
  contentMain: ReactElement | null;
  saved: any;
  edited?: any;
  deleted?: any;
  canceled: any;
  id?: number;
  idEditField: number;
  idEditFieldUpdated: any;
}
