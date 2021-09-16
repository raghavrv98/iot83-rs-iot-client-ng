import { MenuItem } from '../models/menu-item.entity';
export const MENU_ITEMS: MenuItem[] = [
  {
    route: '/devices',
    icon: 'far fa-server',
    title: 'DEVICES',
  },
  {
    route: '/alarms',
    icon: 'fas fa-bell',
    title: 'ALARMS',
  },
  {
    route: '/trends',
    icon: 'fas fa-file-invoice',
    title: 'TRENDS',
  },
  {
    route: '/reports',
    icon: 'fas fa-chart-line',
    title: 'REPORTS',
  },
];
