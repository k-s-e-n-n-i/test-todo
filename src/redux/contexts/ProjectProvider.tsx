import React from 'react';
import { Service } from '../services/ServiceRedux';

const { Provider: ProjectProvider, Consumer: ProjectConsumer } = React.createContext(Service);

export { ProjectProvider, ProjectConsumer };
