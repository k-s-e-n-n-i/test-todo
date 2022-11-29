import React, { ReactElement } from 'react';

export interface Props {
  buttonText: string;
  contentEdit: ReactElement;
  contentMain: ReactElement | null;
  saved: any;
  deleted?: any;
}
