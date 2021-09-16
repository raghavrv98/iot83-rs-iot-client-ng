import { Injectable } from '@angular/core';
import { MENU_ITEMS } from '../data/menu-items-data';
import { MenuItem } from '../models/menu-item.entity';

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {

  constructor() { }

  getMenuItems(templateType: string): MenuItem[] {
    if (templateType === 'homePageTemplate') {
      return MENU_ITEMS;
    } else if (templateType === 'commonTemplate') {
      const menuItems = JSON.parse(JSON.stringify(MENU_ITEMS));
      menuItems.unshift({ route: '/home', icon: 'far fa-home', title: 'HOME' });
      return menuItems;
    }
  }

}
