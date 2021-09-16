import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import { PaginationComponent } from './pagination.component';
import { PaginationService } from './services/pagination.service';

let component: PaginationComponent;

render(PaginationComponent, {
  imports: [FormsModule],
  declarations: [],
  providers: [],
  schemas: [],
});

test('it should create Pagination Component', () => {
  render(PaginationComponent, {
    declarations: [],
    imports: [FormsModule],
  });
  component = new PaginationComponent(new PaginationService());
  expect(component).toBeTruthy();
});

test('it should have heading "Records Per Pages"', () => {
  expect(
    screen.getByRole('heading', {
      name: /records per page/i,
    })
  ).toBeInTheDocument();
});

test('it should show the heading for current and total pages', () => {
  expect(
    screen.getByRole('heading', {
      name: /page of 1/i
    })
  ).toBeInTheDocument();
});

test('it should have input box for current page', () => {
  expect(screen.getByRole('spinbutton')).toBeInTheDocument();
});

test('it should show the total devices', () => {
  expect(
    screen.getByRole('heading', {
      name: /total records :/i,
    })
  ).toBeInTheDocument();
});

test('it should open pages menu on button click', async () => {
  await render(PaginationComponent, {
    imports: [FormsModule],
  });
  const buttonClick = fireEvent.click(
    screen.getByRole('button', { name: /50/i })
  );
  expect(buttonClick).toBeTruthy();
});

test('it should change input box value', () => {
  const inputTextBox = screen.getByRole('spinbutton');
  fireEvent.blur(inputTextBox, { target: { value: 2 } });
  expect(inputTextBox).toHaveValue(2);
});

test('it should have pagination controls to be disabled', () => {
  const nextButton = screen.getByTestId('nextPage');
  expect(nextButton).toBeDisabled();

  const lastButton = screen.getByTestId('forward');
  expect(lastButton).toBeDisabled();

  const previousButton = screen.getByTestId('previousPage');
  expect(previousButton).toBeDisabled();

  const firstPageButton = screen.getByTestId('backwards');
  expect(firstPageButton).toBeDisabled();

});

test('it should click on pagination controls and change current page', async () => {
  await render(PaginationComponent, {
    imports: [FormsModule],
    componentProperties: { currentPage: 1 }
  });

  const nextButton = screen.getByTestId('nextPage');
  fireEvent.click(nextButton);
  expect(screen.getByDisplayValue('2')).toBeInTheDocument();

  const previousButton = screen.getByTestId('previousPage');
  fireEvent.click(previousButton);
  expect(screen.getByDisplayValue('1')).toBeInTheDocument();

  const lastPageButton = screen.getByTestId('forward');
  fireEvent.click(lastPageButton);
  expect(screen.getByDisplayValue('4')).toBeInTheDocument();

  const firstPageButton = screen.getByTestId('backwards');
  fireEvent.click(firstPageButton);
  expect(screen.getByDisplayValue('1')).toBeInTheDocument();

});

test('it should create pages menu from PaginationService', async () => {
  const mockPageMenuData: number[] = [10];
  const mockPaginationService = createMock(PaginationService);
  mockPaginationService.getPageSizes = jest.fn(() => mockPageMenuData);
  await render(PaginationComponent, {
    imports: [FormsModule],
    providers: [
      { provide: PaginationService, useValue: mockPaginationService }
    ]
  });

  return waitFor(() => {
    const pageMenuData = screen.getAllByRole('list').map(l => parseInt(l.textContent, 10));
    expect(pageMenuData).toEqual(mockPageMenuData);
  });

});
