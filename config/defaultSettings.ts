import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  primaryColor: '#77d392',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  pwa: false,
  logo: 'https://cdn-icons-png.flaticon.com/512/2515/2515263.png',
  headerHeight: 48,
  navTheme: 'dark',
  // 拂晓蓝
  colorWeak: false,
  title: 'Happy Meal',
};

export default Settings;
