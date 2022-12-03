import { Breadcrumb, ConfigProvider } from 'antd';
import React from 'react';
import { Helmet } from 'umi';
import 'antd/dist/antd.variable.min.css';
import '@/global.less';

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: '#1677ff',
};

export const Header: React.FC = (props: any) => {
  const { children } = props;
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
  const { children } = props;
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
  const { pageTitle, children, className, ...rest } = props;
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: defaultData.colorPrimary, borderRadius: defaultData.borderRadius },
      }}
    >
      <div className={`${className} ${rest}`}>
        {pageTitle && handleHelmet({ pageTitle })}
        {children}
      </div>
    </ConfigProvider>
  );
};

export default BasicLayout;
