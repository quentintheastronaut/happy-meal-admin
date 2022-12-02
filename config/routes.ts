﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: '',
    component: './Welcome',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: '',
    component: './Dashboard',
  },
  {
    path: '/admin',
    name: 'Management',
    icon: '',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/user',
        name: 'User',
        icon: '',
        component: './UserManagement',
      },
      {
        path: '/admin/group',
        name: 'Group',
        icon: '',
        component: './GroupManagement',
      },
      {
        path: '/admin/dish',
        name: 'Dish',
        icon: '',
        component: './DishManagement',
      },
      {
        path: '/admin/ingredient',
        name: 'Ingredient',
        icon: '',
        component: './IngredientManagement',
      },
      {
        path: '/admin/measurement-type',
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
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
