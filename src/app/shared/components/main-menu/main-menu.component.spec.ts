import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import { createMock, Mock } from '@testing-library/angular/jest-utils';
import { MainMenuComponent } from './main-menu.component';
import { MainMenuService } from '@app/shared/services/main-menu.service';
import { MenuItem } from '@app/shared/models/menu-item.entity';
import { AuthService } from '@app/auth/service/auth/auth.service';

@Component({ selector: 'app-stub-route', template: `<h1>router works</h1>` })
class StubRouteToThisComponent {}

const mockMenuData: MenuItem[] = [
  {
    route: '/route',
    icon: 'icon',
    title: 'TITLE',
  },
];

const mockMainMenuService = createMock(MainMenuService);
const mockAuthService = createMock(AuthService);

it('should render for home page component', async () => {
  mockMainMenuService.getMenuItems = jest.fn(() => mockMenuData);

  const { navigate } = await render(MainMenuComponent, {
    imports: [RouterModule],
    declarations: [StubRouteToThisComponent],
    componentProperties: { templateType: 'homePageTemplate' },
    providers: [
      { provide: MainMenuService, useValue: mockMainMenuService },
      { provide: AuthService, useValue: mockAuthService },
    ],
    routes: [{ path: 'route', component: StubRouteToThisComponent }],
  });

  return waitFor(() => {
    const mockMenuTitles = mockMenuData.map((menuItem) => menuItem.title);
    const menuTitles = screen
      .getAllByRole('link')
      .map((link) => link.textContent);

    expect(menuTitles).toEqual(mockMenuTitles);

    expect(
      screen.queryByRole('heading', { name: 'RAYCHEM Supervisor' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: 'nventLogo' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: 'customerLogo' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Logout' })
    ).not.toBeInTheDocument();

    navigate(screen.getByRole('link', { name: 'TITLE' }));
    expect(
      screen.getByRole('heading', { name: 'router works' })
    ).toBeInTheDocument();
  });
});

it('should render common components', async () => {
  mockMainMenuService.getMenuItems = jest.fn(() => mockMenuData);

  const { navigate } = await render(MainMenuComponent, {
    imports: [RouterModule],
    declarations: [StubRouteToThisComponent],
    componentProperties: { templateType: 'commonTemplate' },
    providers: [
      { provide: MainMenuService, useValue: mockMainMenuService },
      { provide: AuthService, useValue: mockAuthService },
    ],
    routes: [{ path: 'route', component: StubRouteToThisComponent }],
  });

  return waitFor(() => {
    const mockMenuTitles = mockMenuData.map(
      (menuItem) =>
        menuItem.title[0].toUpperCase() + menuItem.title.substr(1).toLowerCase()
    );
    const menuTitles = screen
      .getAllByRole('link')
      .map((link) => link.textContent);
    expect(menuTitles).toEqual(mockMenuTitles);

    expect(
      screen.getByRole('heading', { name: 'RAYCHEM Supervisor' })
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'nventLogo' })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'customerLogo' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();

    navigate(screen.getByRole('link', { name: 'Title' }));
    expect(
      screen.getByRole('heading', { name: 'router works' })
    ).toBeInTheDocument();
  });
});
