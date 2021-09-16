jest.useFakeTimers();
import { render, screen, waitFor } from '@testing-library/angular';
import { HomePageComponent } from './home-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MainMenuComponent } from '@app/shared/components/main-menu/main-menu.component';
import { createMock } from '@testing-library/angular/jest-utils';
import { AuthService } from '@app/auth/service/auth/auth.service';

const mockAuthService = createMock(AuthService);

const renderOptions = {
  declarations: [MainMenuComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [{ provide: AuthService, useValue: mockAuthService }],
};

it('should show all text contents', async () => {
  await render(HomePageComponent, renderOptions);
  return waitFor(() => {
    expect(screen.getByText(/raychem/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Hello! nVent Demo' })
    ).toBeInTheDocument();
    expect(screen.getByText(/welcome to/i)).toBeInTheDocument();
    expect(screen.getByText(/shell scotford/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /quick summary/i })
    ).toBeInTheDocument();
  });
});

it('should have a logout button', async () => {
  await render(HomePageComponent, renderOptions);
  return waitFor(() => {
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
});
