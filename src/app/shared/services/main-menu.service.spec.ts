import { MENU_ITEMS } from '../data/menu-items-data';
import { MainMenuService } from './main-menu.service';

describe('MainMenuService', () => {
  let service: MainMenuService;

  beforeEach(() => {
    service = new MainMenuService();
  });

  it('should get menu items according to template types', () => {
    enum MenuTemplateType { homePageTemplate = 'homePageTemplate', commonTemplate = 'commonTemplate' };
    const commonMenuItems = [{ route: '/home', icon: 'far fa-home', title: 'HOME' }, ...MENU_ITEMS];

    const homePageMenuItems = service.getMenuItems(MenuTemplateType.homePageTemplate);
    expect(homePageMenuItems).toBe(MENU_ITEMS);

    const commonTemplateMenuItems = service.getMenuItems(MenuTemplateType.commonTemplate);
    expect(commonTemplateMenuItems).toStrictEqual(commonMenuItems);
  });
});
