import React, { ReactElement } from 'react';

export interface Props {
  buttonText: string;
  contentEdit: ReactElement | null;
  contentMain: ReactElement | null;
  saved: any;
  deleted?: any;
}
