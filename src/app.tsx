import RightContent from '@/components/RightContent';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';
import 'antd/dist/antd.less';
import './global.less';
import styles from './styles.less';
import MenuFooter from './components/MenuFooter';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  //'Empty block statement' code smell
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    menuFooterRender: () => <MenuFooter />,
    childrenRender: (children: any, props: any) => {
      return (
        <>
          <div className={styles.container}>{children}</div>
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer disableUrlParams enableDarkTheme settings={initialState?.settings} />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
