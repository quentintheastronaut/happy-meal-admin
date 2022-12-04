export default [
  {
    name: 'Login',
    layout: false,
    path: '/login',
    hideInMenu: true,
    component: './LoginPage',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'DashboardOutlined',
    component: './Dashboard',
    exact: true,
  },
  {
    path: '/',
    name: 'Management',
    icon: 'AppstoreOutlined',
    routes: [
      {
        path: '/management/user',
        name: 'User',
        icon: 'UserOutlined',
        component: './UserManagement',
      },
      {
        path: '/management/group',
        name: 'Group',
        icon: 'UsergroupAddOutlined',
        component: './GroupManagement',
      },
      {
        path: '/management/dish',
        name: 'Dish',
        icon: '',
        component: './DishManagement',
      },
      {
        path: '/management/ingredient',
        name: 'Ingredient',
        icon: '',
        component: './IngredientManagement',
      },
      {
        path: '/management/measurement-type',
        name: 'Measurement Type',
        icon: '',
        component: './MeasurementType',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
