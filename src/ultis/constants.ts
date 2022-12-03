export const API = {
  MENU: '/menu',
  GROUP: '/group',
  DISH: '/dish',
  USER: '/user',
  INGREDIENT: '/ingredient',
  MEASUREMENT_TYPE: '/measurement',
};

export const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const timeFormat = {
  FULL_TIME: 'DD/MM/YYYY HH:mm',
  DATE: 'DD/MM/YYYY',
};

export const SEX = {
  MALE: 'male',
  FEMALE: 'female',
};

export const USER_STATUS = {
  ACTIVE: 'Active',
  DEACTIVE: 'Deactive',
};

export const ACTIVITY_INTENSITY = {
  SEDENTARY: {
    value: 'sedentary',
    label: 'Sedentary',
  },
  LIGHTLY_ACTIVE: {
    value: 'lightly_active',
    label: 'Lightly active',
  },
  MODERATELY_ACTIVE: {
    value: 'moderately_active',
    label: 'Moderately active',
  },
  VERY_ACTIVE: {
    value: 'very_active',
    label: 'Very active',
  },
  EXTRA_ACTIVE: {
    value: 'extra_active',
    label: 'Extra active',
  },
};

export const ACTIVITY_INTENSITY_LIST = [
  ACTIVITY_INTENSITY.SEDENTARY,
  ACTIVITY_INTENSITY.LIGHTLY_ACTIVE,
  ACTIVITY_INTENSITY.MODERATELY_ACTIVE,
  ACTIVITY_INTENSITY.VERY_ACTIVE,
  ACTIVITY_INTENSITY.EXTRA_ACTIVE,
];

export const HEALTH_GOAL_LIST = [
  {
    value: 'eat_healthier',
    label: 'Eat and live healthier',
  },
  {
    value: 'boost_energy',
    label: 'Boost my energy and mood',
  },
  {
    value: 'stay_motivated',
    label: 'Stay motivated and consistent',
  },
  {
    value: 'feed_better',
    label: 'Feel better about my body',
  },
];
