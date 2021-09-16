import { FormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { FilterService } from '../filter/services/filter.service';
import { BookmarkControlComponent } from './bookmark-control.component';
import { BookmarkService } from './services/bookmark.service';
import { createMock } from '@testing-library/angular/jest-utils';

render(BookmarkControlComponent, {
  imports: [FormsModule]
});

const component = new BookmarkControlComponent(new BookmarkService(new FilterService()), new FilterService());

test('it should create BookmarkControl Component', () => {
  expect(component).toBeTruthy();
});

test('it should have bookmarks input box', () => {
  expect(screen.getByTestId('bookmarkBox')).toBeInTheDocument();
});

test('it should delete the bookmarks', () => {
  const mockBookmarkService = createMock(BookmarkService);
  mockBookmarkService.deleteSelectedBookmark = jest.fn();
  const bookmarkName = 'area';
  component.deleteSelectedBookmark = jest.fn();
  component.deleteSelectedBookmark(bookmarkName);

  expect(component.deleteSelectedBookmark).toHaveBeenCalled();
});

test('it should search the bookmarks', () => {
  const bookmarkName = 'area';
  component.searchBookmarkHandler = jest.fn();
  component.searchBookmarkHandler(bookmarkName);

  expect(component.searchBookmarkHandler).toHaveBeenCalled();
});

test('it should select the bookmarks', () => {
  const mockBookmarkService = createMock(BookmarkService);
  mockBookmarkService.selectedBookmark = jest.fn();
  const bookmarkName = 'area';
  component.selectedBookmark = jest.fn();
  component.selectedBookmark(bookmarkName);

  expect(component.selectedBookmark).toHaveBeenCalled();
});

test('it should save a bookmark', () => {
  const mockBookmarkService = createMock(BookmarkService);
  mockBookmarkService.saveBookmarkHandler = jest.fn();
  component.saveBookmarkHandler = jest.fn();
  component.saveBookmarkHandler();

  expect(component.saveBookmarkHandler).toHaveBeenCalled();
});

test('it should open/close filter menu', () => {
  const mockBookmarkService = createMock(FilterService);
  mockBookmarkService.filterStateChangeHandler = jest.fn();
  component.filterStateChangeHandler = jest.fn();
  component.filterStateChangeHandler();

  expect(component.filterStateChangeHandler).toHaveBeenCalled();
});
