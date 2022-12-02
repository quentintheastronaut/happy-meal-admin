import { Breadcrumb } from 'antd';
import React from 'react';
import { Helmet } from 'umi';

export const Header: React.FC = (props: any) => {
    const {children} = props
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>{children}</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export const Body = (props: any) => {
    const { children } = props
  return <div>{children}</div>;
};

const handleHelmet = (props: any) => {
  const { pageTitle, meta } = props;
  return (
    <Helmet>
      <title>{pageTitle}</title>
      {meta}
    </Helmet>
  );
};

const BasicLayout: React.FC = (props: any) => {
    const { pageTitle, children, className, ...rest } = props
    return (
    <div className={`${className} ${rest}`}>
    {pageTitle && handleHelmet({ pageTitle })}
    {children}
  </div>
  )
};

export default BasicLayout