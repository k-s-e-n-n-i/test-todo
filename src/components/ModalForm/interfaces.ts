import React, { ReactElement } from 'react';

export interface Props {
  textButton: string;
  content: ReactElement;
  saved: any;
  modal: string;
  modalUpdated: any;
  id?: string;
}
