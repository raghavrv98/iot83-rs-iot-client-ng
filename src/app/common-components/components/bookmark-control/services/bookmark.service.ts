import { Injectable } from '@angular/core';
import { FilterService } from '@app/common-components/components/filter/services/filter.service';
import { cloneDeep } from 'lodash';
import * as _ from 'lodash';
import { BookmarkResponse } from '@app/shared/models/bookmark-response';
import { FILTER_LIST_WITH_VALUES } from '@app/shared/data/filter-data';
import { SessionStorage } from '@app/shared/models/storage/session-storage.entity';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarkObject = new BookmarkResponse();
  sessionStorage: SessionStorage;

  constructor(private filterService: FilterService) {
    this.sessionStorage = new SessionStorage();
  }

  saveBookmarkHandler(bookmarksList, selectedFilters, saveBookmarkName) {
    const filtersListWithFilteredValues = this.sessionStorage.getFiltersListWithFilteredValues();

    if (bookmarksList.findIndex(val => val.bookmarkName === saveBookmarkName) !== -1) {
      const selectedBookmarkListObjectIndex = bookmarksList.findIndex(val => val.bookmarkName === saveBookmarkName);
      bookmarksList[selectedBookmarkListObjectIndex].bookmarkFilters = filtersListWithFilteredValues;
      bookmarksList[selectedBookmarkListObjectIndex].selectedFilters = selectedFilters;
    } else {
      bookmarksList.push({
        bookmarkName: saveBookmarkName,
        bookmarkFilters: filtersListWithFilteredValues,
        selectedFilters
      });
    }

    this.bookmarkObject.bookmarksList = bookmarksList;
    this.bookmarkObject.bookmarkOptions = bookmarksList;
    this.bookmarkObject.bookmarkPlaceholder = saveBookmarkName;
    this.bookmarkObject.currentBookmarkName = saveBookmarkName;
    this.bookmarkObject.saveBookmarkName = saveBookmarkName;
    this.bookmarkObject.bookmarkTitle = 'Saved Bookmark';

    sessionStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
    sessionStorage.setItem('bookmarkName', JSON.stringify(saveBookmarkName));
    sessionStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    sessionStorage.setItem('bookmarkPlaceholder', JSON.stringify(saveBookmarkName));

    return this.bookmarkObject;
  }

  selectedBookmark(name) {
    let allFiltersData = this.sessionStorage.getAllFiltersData();
    const bookmarksList = this.sessionStorage.getBookmarksList();
    const filtersListWithFilteredValues = name === 'Bookmarks' ?
      FILTER_LIST_WITH_VALUES :
      bookmarksList.find(val => val.bookmarkName === name).bookmarkFilters;
    const bookmarkName = name === 'Bookmarks' ? '' : name;
    const bookmarkPlaceholder = name === 'Bookmarks' ? bookmarksList.length > 0 ? 'No Bookmark Selected' : 'No Bookmark Added' : name;
    const selectedFilters = name === 'Bookmarks' ? [] : bookmarksList.find(val => val.bookmarkName === name).selectedFilters;
    allFiltersData = this.filterService.getFilterData(allFiltersData, filtersListWithFilteredValues);

    sessionStorage.setItem('allFiltersData', JSON.stringify(allFiltersData));
    sessionStorage.setItem('filtersListWithFilteredValues', JSON.stringify(filtersListWithFilteredValues));
    sessionStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    sessionStorage.setItem('bookmarkName', JSON.stringify(bookmarkName));
    sessionStorage.setItem('bookmarkPlaceholder', JSON.stringify(bookmarkPlaceholder));

    this.filterService.filterSubject.next(selectedFilters);
    this.bookmarkObject.saveBookmarkName = bookmarkName;
    this.bookmarkObject.currentBookmarkName = bookmarkName;
    this.bookmarkObject.bookmarkPlaceholder = bookmarkPlaceholder;
    this.bookmarkObject.bookmarkTitle = sessionStorage.getItem('bookmarkName') ?
      JSON.parse(sessionStorage.getItem('bookmarkName')).length === 0 ?
        'Save Bookmark' :
        this.isBookmarkActiveHandler() ?
          'Saved Bookmark' :
          'Edited' :
      'Save Bookmark';

    const selectedBookmarkObject = {
      allFiltersData,
      bookmarksList,
      bookmarkName,
      filtersListWithFilteredValues,
      selectedFilters,
      bookmarkPlaceholder
    };

    return selectedBookmarkObject;
  }

  isBookmarkActiveHandler() {
    const filtersListWithFilteredValues = this.sessionStorage.getFiltersListWithFilteredValues();
    const bookmarkName = this.sessionStorage.getBookmarkName();
    const bookmarksList = this.sessionStorage.getBookmarksList();
    const findObj = bookmarksList.find(val => _.isEqual(val.bookmarkFilters, filtersListWithFilteredValues));

    return (findObj && bookmarkName.length > 0 && bookmarkName !== 'Bookmarks');
  }

  deleteSelectedBookmark(name, bookmarkName, bookmarksList) {
    if (name !== bookmarkName) {
      bookmarksList = sessionStorage.getItem('bookmarksList') ?
        JSON.parse(sessionStorage.getItem('bookmarksList')) :
        cloneDeep(bookmarksList);
      const index = bookmarksList.findIndex(val => val.bookmarkName === name);
      bookmarkName = sessionStorage.getItem('bookmarkName') ? JSON.parse(sessionStorage.getItem('bookmarkName')) : bookmarkName;
      bookmarksList.splice(index, 1);
      const bookmarkPlaceholder = bookmarksList.length === 0 ?
        'No Bookmark Added' :
        JSON.parse(sessionStorage.getItem('bookmarkPlaceholder'));

      this.bookmarkObject.bookmarkOptions = bookmarksList;
      this.bookmarkObject.bookmarkPlaceholder = bookmarkPlaceholder;
      this.bookmarkObject.bookmarksList = bookmarksList;

      sessionStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
      sessionStorage.setItem('bookmarkPlaceholder', JSON.stringify(bookmarkPlaceholder));

      const deleteSelectedBookmarkObject = {
        bookmarksList, bookmarkPlaceholder
      };
      return deleteSelectedBookmarkObject;
    }
  }

  bookmarkInitialDataHandler() {

    const bookmarksList = sessionStorage.getItem('bookmarksList') ? JSON.parse(sessionStorage.getItem('bookmarksList')) : [];
    const currentBookmarkName = sessionStorage.getItem('bookmarkName') ? JSON.parse(sessionStorage.getItem('bookmarkName')) : '';

    const bookmarkPlaceholder = bookmarksList.length > 0 ?
      currentBookmarkName.length > 0 ?
        currentBookmarkName :
        'No Bookmark Selected' :
      'No Bookmark Added';

    this.bookmarkObject.bookmarksList = bookmarksList;
    this.bookmarkObject.bookmarkOptions = bookmarksList;
    this.bookmarkObject.bookmarkPlaceholder = bookmarkPlaceholder;
    this.bookmarkObject.currentBookmarkName = currentBookmarkName;
    this.bookmarkObject.saveBookmarkName = currentBookmarkName;
    this.bookmarkObject.bookmarkTitle = sessionStorage.getItem('bookmarkName') ?
      JSON.parse(sessionStorage.getItem('bookmarkName')).length === 0 ?
        'Save Bookmark' :
        this.isBookmarkActiveHandler() ?
          'Saved Bookmark' :
          'Edited' :
      'Save Bookmark';

    sessionStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
    sessionStorage.setItem('bookmarkPlaceholder', JSON.stringify(bookmarkPlaceholder));

    return this.bookmarkObject;
  }
}
