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
    redirect: '/management/dish',
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
        path: '/management/location',
        name: 'Location',
        icon: '',
        component: './LocationManagement',
      },
      {
        path: '/management/food-category',
        name: 'Food Category',
        icon: '',
        component: './FoodCategory',
      },
      {
        path: '/management/ingredient-category',
        name: 'Ingredient Category',
        icon: '',
        component: './IngredientCategory',
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
