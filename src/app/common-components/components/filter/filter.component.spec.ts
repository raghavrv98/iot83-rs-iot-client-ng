import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { FilterComponent } from './filter.component';
import { FilterService } from './services/filter.service';
import { createMock } from '@testing-library/angular/jest-utils';
import { FilterItem, FiltersListWithValues } from '@app/shared/models/filter-items.entity';
import { AlarmNotificationComponent } from '../alarm-notification/alarm-notification.component';
import { FormsModule } from '@angular/forms';
import { BookmarkService } from '../bookmark-control/services/bookmark.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

let component: FilterComponent;

render(FilterComponent, {
  imports: [FormsModule],
  declarations: [AlarmNotificationComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
});

test('it should create FilterComponent', () => {
  component = new FilterComponent(
    new FilterService(), new BookmarkService(new FilterService())
  );
  expect(component).toBeTruthy();
});

test('it should apply filter', () => {
  const subItem = {
    name: 'shellScotford',
    checked: true,
    displayName: 'Shell Scotford'
  };
  const item = {
    display: true,
    name: 'site',
    displayName: 'Site',
    subFilters: [
      subItem
    ]
  };
  const arbitrarilyAppliedFilter: FiltersListWithValues[] = [{ name: 'site', filteredValues: ['Shell Scotford'] }];
  const bookmarkTitle = 'Save Bookmark';
  const applyFilterObject = { filtersListWithFilteredValues: arbitrarilyAppliedFilter, bookmarkTitle };
  const mockBookmarkService = createMock(BookmarkService);
  const mockFilterService = createMock(FilterService);
  const mockIsBookmarkActive = false;
  mockBookmarkService.isBookmarkActiveHandler = jest.fn(() => mockIsBookmarkActive);
  mockFilterService.applyFilter = jest.fn(() => applyFilterObject);

  component.applyFilter(item, subItem);
  expect(component.filtersListWithFilteredValues[0]).toEqual(applyFilterObject.filtersListWithFilteredValues[0]);
});

test('it should reset applied filters', () => {
  const mockElement = {
    display: true,
    name: 'site',
    displayName: 'Site',
    subFilters: [
      {
        name: 'shellScotford',
        checked: false,
        displayName: 'Shell Scotford'
      }
    ]
  };
  const mockSelectedBookmarkObject = {
    allFiltersData: [mockElement],
    bookmarksList: [],
    bookmarkName: '',
    filtersListWithFilteredValues: [{
      name: 'site',
      filteredValues: [],
    }],
    selectedFilters: [],
    bookmarkPlaceholder: ''
  };
  const mockBookmarkService = createMock(BookmarkService);
  const mockFilterService = createMock(FilterService);
  mockBookmarkService.selectedBookmark = jest.fn(() => mockSelectedBookmarkObject);
  mockFilterService.showSubFilterItems = jest.fn(() => mockElement);

  component.resetFilter();
  expect(component.mobileSelectedFilter).toEqual(mockElement);
  expect(component.allFiltersData[0]).toEqual(mockSelectedBookmarkObject.allFiltersData[0]);
});

test('it should apply search on filter sub-items', () => {
  const val = {
    display: true,
    name: 'site',
    displayName: 'Site',
    subFilters: [
      {
        name: 'shellScotford',
        checked: false,
        displayName: 'Shell Scotford'
      }
    ]
  };
  const mockAllFiltersData = [{
    display: true,
    name: 'site',
    displayName: 'Site',
    subFilters: [
      {
        name: 'shellScotford',
        checked: false,
        displayName: 'Shell Scotford'
      }
    ]
  }];
  const mockFilterService = createMock(FilterService);
  mockFilterService.searchBoxFilter = jest.fn(() => mockAllFiltersData);

  component.searchBoxFilter(val);
  expect(component.allFiltersData[0]).toEqual(mockAllFiltersData[0]);
});

test('it should display appropriate tag on filter dropdown', () => {
  const itemName = 'area';
  const mockLabel = '';

  const mockFilterService = createMock(FilterService);
  mockFilterService.appliedFilterHandler = jest.fn(() => mockLabel);

  const tagName = component.appliedFilterHandler(itemName);
  expect(tagName).toBe(mockLabel);
});

test('it should reset search box field', () => {
  const expectedValue = '';
  component.resetSearchBoxField();
  expect(component.searchSubFilter).toEqual(expectedValue);
});

test('it should check whether an extra filter is added in filter menu', async () => {
  await render(FilterComponent, {
    declarations: [AlarmNotificationComponent],
    imports: [FormsModule],
    schemas: [NO_ERRORS_SCHEMA],
  });

  expect(screen.getByTestId('filterBtn')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('filterBtn'));
  component.initialDataHandler();
  component.filterStateChangeHandler();

  fireEvent.click(screen.getByRole('button', { name: /add\/remove filter/i }));
  expect(screen.getByRole('heading', { name: /add \/ remove filter ×/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('checkbox', { name: /system number/i }));
  fireEvent.click(screen.getByRole('button', { name: /Close/i }));
  expect(screen.getByRole('button', {name: 'System Number'})).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /add\/remove filter/i }));
  expect(screen.getByRole('heading', { name: /add \/ remove filter ×/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('checkbox', { name: /system number/i }));
  fireEvent.click(screen.getByRole('button', { name: /Close/i }));
});

test('it should create all filter menu from FilterService', async () => {
  const mockFilterMenu: FilterItem[] = [
    {
      display: true,
      displayName: 'blah title',
      subFilters: [],
      name: ''
    },
  ];
  const initialDataObject = {
    selectedFilters: [],
    filtersListWithFilteredValues: [
      {
        name: 'site',
        filteredValues: [],
      }],
    allFiltersData: [
      {
        display: true,
        name: 'site',
        displayName: 'Site',
        subFilters: [
          {
            name: 'shellScotford',
            checked: false,
            displayName: 'Shell Scotford'
          }
        ]
      }]
  };
  sessionStorage.setItem('mockFilterMenu', JSON.stringify(mockFilterMenu));
  const mockFilterService = createMock(FilterService);
  mockFilterService.initialDataHandler = jest.fn(() => initialDataObject);

  component.initialDataHandler();
  await render(FilterComponent, {
    imports: [FormsModule],
    declarations: [AlarmNotificationComponent],
    providers: [{ provide: FilterService, useValue: mockFilterService }],
    schemas: [NO_ERRORS_SCHEMA],
  });
  return waitFor(() => {
    component.filterStateChangeHandler();
    const menu = mockFilterMenu.map((fm) => fm.displayName);
    const filterMenu = JSON.parse(sessionStorage.getItem('mockFilterMenu')).map((l) => l.displayName);
    expect(filterMenu).toEqual(menu);
  });
});

test('it should show sub filter items', () => {
  component.showSubFilterItems = jest.fn();
  component.showSubFilterItems();

  expect(component.showSubFilterItems).toHaveBeenCalled();
});

test('it should initialize data', () => {
  component.initialDataHandler = jest.fn();
  component.initialDataHandler();

  expect(component.initialDataHandler).toHaveBeenCalled();
});

test('it should add extra filter to filter menu', () => {
  component.addExtraFilterHandler = jest.fn();
  component.addExtraFilterHandler();

  expect(component.addExtraFilterHandler).toHaveBeenCalled();
});
