import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;
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
  const mockSelectedFilters = [{
    filterId: 'site',
    subFilterNames: ['Shell Scotford']
  }];

  beforeEach(() => {
    service = new FilterService();
  });

  it('should create filtered data according to selected filter', () => {

    const filtersListWithFilteredValues = [{
      name: 'site',
      filteredValues: ['Shell Scotford'],
    }];

    const arbitrarilyAllFiltersData = [{
      display: true,
      name: 'site',
      displayName: 'Site',
      subFilters: [
        {
          name: 'shellScotford',
          checked: true,
          displayName: 'Shell Scotford'
        }
      ]
    }];

    const value = service.getFilterData(mockAllFiltersData, filtersListWithFilteredValues);
    expect(value).toStrictEqual(arbitrarilyAllFiltersData);
  });

  it('should create applied filters data according to selected filter', () => {
    const arbitrarilyFiltersListWithFilteredValues = {
      name: 'site',
      filteredValues: ['Shell Scotford'],
    };
    const isBookmarkActive = true;

    const value = service.applyFilter(mockAllFiltersData[0], mockAllFiltersData[0].subFilters[0], isBookmarkActive);

    expect(value.filtersListWithFilteredValues[0]).toStrictEqual(arbitrarilyFiltersListWithFilteredValues);
  });

  it('should handle filter menu when mobile view is true and filter state is open', () => {
    const isMobileView = true;
    const isFilterClose = true;
    const value = service.filterStateChangeHandler(isMobileView, isFilterClose);
    expect(value).toBeFalsy();
  });

  it('should handle filter menu when mobile view is false and filter state is open', () => {
    const isMobileView = false;
    const isFilterClose = true;
    const value = service.filterStateChangeHandler(isMobileView, isFilterClose);
    expect(value).toBeFalsy();
  });

  it('should handle filter menu when mobile view is true and filter state is closed', () => {
    const isMobileView = true;
    const isFilterClose = false;
    const value = service.filterStateChangeHandler(isMobileView, isFilterClose);
    expect(value).toBeTruthy();
  });

  it('should handle filter menu when mobile view is false and filter state is closed', () => {
    const isMobileView = false;
    const isFilterClose = false;
    const value = service.filterStateChangeHandler(isMobileView, isFilterClose);
    expect(value).toBeTruthy();
  });

  it('should return filter tag with sub filter name', () => {
    const name = 'site';
    sessionStorage.setItem('selectedFilters', JSON.stringify(mockSelectedFilters));

    const arbitrarilyTagName = ': Shell Scotford';
    const tagName = service.appliedFilterHandler(name);
    expect(tagName).toBe(arbitrarilyTagName);
  });

  it('should return filter tag with count of sub filters', () => {
    const name = 'area';
    const selectedFilters = [
      {
        filterId: 'area',
        subFilterNames: [
          'Hydrogen generation',
          'Hydrocracking'
        ]
      }
    ];
    sessionStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    const arbitrarilyTagName = ': 2 items';
    const tagName = service.appliedFilterHandler(name);
    expect(tagName).toBe(arbitrarilyTagName);
  });

  it('should return filtered sub filter items according to search value', () => {
    const searchSubFilter = 'shell';
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
    sessionStorage.setItem('allFiltersData', JSON.stringify(mockAllFiltersData));
    const allFiltersData = service.searchBoxFilter(val, searchSubFilter);
    expect(allFiltersData[0]).toStrictEqual(mockAllFiltersData[0]);
  });

  it('should return sub filter items for selected filter in mobile view', () => {
    const index = 0;
    const arbitrarilyAllFiltersData = {
      display: true,
      name: 'site',
      displayName: 'Site',
      subFilters: [
        {
          name: 'shellScotford',
          checked: true,
          displayName: 'Shell Scotford'
        }]
    };
    const value = service.showSubFilterItems(index);
    expect(value).toStrictEqual(arbitrarilyAllFiltersData);
  });

});
