import { Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import styles from './index.less';

const MenuFooter: React.FC = (props: any) => {
  const { logout } = props;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`${styles.menuFooter}`}>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch({ type: 'auth/logout' }),
});

export default connect(mapDispatchToProps, mapDispatchToProps)(MenuFooter);
