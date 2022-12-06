import { Breadcrumb } from 'antd';
import React, { useEffect } from 'react';
import { connect, Helmet } from 'umi';
import styles from './index.less';
import 'antd/dist/antd.variable.min.css';
import '@/global.less';
import mapStateToProps from './mapStateToProps';

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
  const { pageTitle, children, className, fetchMeasurementList, fetchProfile, ...rest } = props;

  useEffect(() => {
    fetchProfile();
    fetchMeasurementList();
  }, []);
  return (
    <div className={`${className} ${rest} ${styles.basicLayout}`}>
      {pageTitle && handleHelmet({ pageTitle })}
      {children}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchProfile: () => dispatch({ type: 'auth/fetchProfile' }),
  fetchMeasurementList: () => dispatch({ type: 'measurement/fetchMeasurementList' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
