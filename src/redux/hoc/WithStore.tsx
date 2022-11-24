import React from 'react';
import { ProjectConsumer } from '../contexts/ProjectProvider';

const WithStore = () => (Wrapper: any) => {
  return (props: any) => {
    return (
      <ProjectConsumer>
        {(service) => {
          return <Wrapper {...props} service={service} />;
        }}
      </ProjectConsumer>
    );
  };
};

export default WithStore;
