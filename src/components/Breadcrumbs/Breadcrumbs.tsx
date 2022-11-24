import React from 'react';
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import './Breadcrumbs.scss';

const Breadcrumbs = ({ title }: { title?: string }) => {
  const breadcrumbs = useBreadcrumbs([
    { path: '/', breadcrumb: 'Главная' },
    { path: '/project-:id', breadcrumb: title },
  ]);

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map(({ match, breadcrumb }: any) => (
        <span className="breadcrumbs__item" key={match.pathname}>
          <NavLink to={match.pathname} className="breadcrumbs__link">
            {breadcrumb}
          </NavLink>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
