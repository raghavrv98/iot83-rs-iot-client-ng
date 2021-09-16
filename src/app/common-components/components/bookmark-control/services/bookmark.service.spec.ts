import { BookmarkService } from './bookmark.service';
import { FilterService } from '../../filter/services/filter.service';

describe('BookmarkService', () => {
  let service: BookmarkService;
  const selectedFilters = [
    {
      filterId: 'area',
      subFilterNames: ['Hydrogen generation']
    }
  ];
  const bookmarksList = [
    {
      bookmarkName: 'area',
      selectedFilters,
      bookmarkFilters: [
        {
          name: 'site',
          filteredValues: []
        },
        {
          name: 'plant',
          filteredValues: []
        },
        {
          name: 'area',
          filteredValues: ['Hydrogen generation']
        }
      ],
    }
  ];
  const filtersListWithFilteredValues = [
    {
      name: 'site',
      filteredValues: []
    },
    {
      name: 'plant',
      filteredValues: []
    },
    {
      name: 'area',
      filteredValues: ['Hydrogen generation']
    }
  ];

  const allFiltersData = [
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
    },
    {
      display: true,
      name: 'plant',
      displayName: 'Plant',
      subFilters: [
        {
          name: 'refinery',
          checked: false,
          displayName: 'Refinery'
        }
      ]
    },
    {
      display: true,
      name: 'area',
      displayName: 'Area',
      subFilters: [
        {
          name: 'hydrogenGeneration',
          checked: true,
          displayName: 'Hydrogen generation'
        },
        {
          name: 'hydrocracking',
          checked: false,
          displayName: 'Hydrocracking'
        },
        {
          name: 'utilities',
          checked: false,
          displayName: 'Utilities'
        }
      ]
    }
  ];

  beforeEach(() => {
    service = new BookmarkService(new FilterService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return bookmark list and other values', () => {
    const saveBookmarkName = 'area';
    const arbitrarilySaveBookmarkObject = {
      bookmarksList,
      bookmarkOptions: bookmarksList,
      bookmarkPlaceholder: 'area',
      currentBookmarkName: 'area',
      saveBookmarkName: 'area',
      bookmarkTitle: 'Saved Bookmark',
    };
    sessionStorage.setItem('filtersListWithFilteredValues', JSON.stringify(filtersListWithFilteredValues));
    const value = service.saveBookmarkHandler(bookmarksList, selectedFilters, saveBookmarkName);
    expect(value).toEqual(arbitrarilySaveBookmarkObject);
  });

  it('should be return boolean value, is bookmark selected or not', () => {
    const arbitrarilyIsBookmarkSelected = true;
    const value = service.isBookmarkActiveHandler();
    expect(value).toBe(arbitrarilyIsBookmarkSelected);
  });

  it('should be verify is selected bookmark or not', () => {
    const name = 'area';
    sessionStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
    sessionStorage.setItem('allFiltersData', JSON.stringify(allFiltersData));
    service.selectedBookmark(name);
    expect(service.bookmarkObject.saveBookmarkName).toBe(name);
  });

  it('should be return bookmark list and other values after deletion of bookmark', () => {
    const name = 'area';
    const bookmarkName = '';
    const arbitrarilyDeleteSelectedBookmarkObject = {
      bookmarksList: [],
      bookmarkPlaceholder: 'No Bookmark Added'
    };
    const value = service.deleteSelectedBookmark(name, bookmarkName, bookmarksList);
    expect(value).toStrictEqual(arbitrarilyDeleteSelectedBookmarkObject);
  });
});
