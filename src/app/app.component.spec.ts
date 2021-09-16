import { AppComponent } from './app.component';
import { render } from '@testing-library/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {

  test('should create the app', () => {
    render(AppComponent, {
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: '/home', pathMatch: 'full' },
        ]),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

});
