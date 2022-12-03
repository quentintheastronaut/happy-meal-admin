import RightContent from '@/components/RightContent';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';
import 'antd/dist/antd.less';
import './global.less';
import styles from './styles.less';

// import 'antd/lib/style/color/colorPalette.less';
// import 'antd/dist/antd.less';
// import 'antd/lib/style/themes/default.less';
import './theme.less';
// import 'antd/dist/antd.variable.min.css';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
// export async function getInitialState(): Promise<{
//   settings?: Partial<LayoutSettings>;
//   currentUser?: API.CurrentUser;
//   loading?: boolean;
//   fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
// }> {
//   const fetchUserInfo = async () => {
//     try {
//       const msg = await queryCurrentUser();
//       return msg.data;
//     } catch (error) {
//       history.push(loginPath);
//     }
//     return undefined;
//   };
//   // 如果不是登录页面，执行
//   if (history.location.pathname !== loginPath) {
//     const currentUser = await fetchUserInfo();
//     return {
//       fetchUserInfo,
//       currentUser,
//       settings: defaultSettings,
//     };
//   }
//   return {
//     fetchUserInfo,
//     settings: defaultSettings,
//   };
// }

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => {},
    // onPageChange: () => {
    //   const { location } = history;
    //   // 如果没有登录，重定向到 login
    //   if (!initialState?.currentUser && location.pathname !== loginPath) {
    //     history.push(loginPath);
    //   }
    // },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: any) => {
      // if (initialState?.loading) return <PageLoading />;
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