import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Tracker',
    icon: 'map-outline',
    link: '/pages/admin/tracker',
  },
  {
    title: 'Admin',
    icon: 'layout-outline',
    children: [
      {
        title: 'Home',
        link: '/pages/admin', // A modifier
      },
      {
        title: 'Create package',
        link: '/pages/admin/package', // A modifier
      },
      {
        title: 'Create delivery',
        link: '/pages/admin/delivery', // A modifier
      },
    ]
  },
  {
    title: 'Driver',
    icon: 'checkmark',
    link: '/pages/admin/driver',
  },
];
