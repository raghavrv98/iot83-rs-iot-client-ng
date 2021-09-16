import { Component, OnInit } from '@angular/core';
import { FilterItem, FiltersListWithValues, SubFilterItem, SelectedFilters } from '@app/shared/models/filter-items.entity';
import { FilterService } from './services/filter.service';
import { BookmarkService } from '@app/common-components/components/bookmark-control/services/bookmark.service';
import { BaseComponent } from '@app/base.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent extends BaseComponent implements OnInit {

  filtersListWithFilteredValues: FiltersListWithValues[] = [];
  allFiltersData: FilterItem[];
  selectedFilters: SelectedFilters[] = [];
  mobileSelectedFilter: FilterItem;
  subFilterItems: SubFilterItem[];
  selectedFilterAttr = '';
  searchSubFilter = '';

  constructor(
    public filterService: FilterService,
    private bookmarkService: BookmarkService
  ) {
    super();
  }

  resetFilter() {
    const name = 'Bookmarks';
    const selectedBookmarkObject = this.bookmarkService.selectedBookmark(name);
    this.allFiltersData = selectedBookmarkObject.allFiltersData;
    this.showSubFilterItems();
  }

  addExtraFilterHandler() {
    sessionStorage.setItem('allFiltersData', JSON.stringify(this.allFiltersData));
  }

  applyFilter(item: FilterItem, subItem: SubFilterItem) {
    const isBookmarkActive = this.bookmarkService.isBookmarkActiveHandler();
    const applyFilterObject = this.filterService.applyFilter(item, subItem, isBookmarkActive);
    this.bookmarkService.bookmarkObject.bookmarkTitle = applyFilterObject.bookmarkTitle;
    this.filtersListWithFilteredValues = applyFilterObject.filtersListWithFilteredValues;
  }

  searchBoxFilter(val) {
    this.allFiltersData = this.filterService.searchBoxFilter(val, this.searchSubFilter);
  }

  appliedFilterHandler(name: string) {
    const tagName = this.filterService.appliedFilterHandler(name);
    return tagName;
  }

  resetSearchBoxField() {
    this.searchSubFilter = '';
    this.allFiltersData = JSON.parse(sessionStorage.getItem('allFiltersData'));
  }

  filterStateChangeHandler(isFilterClose: boolean = false) {
    this.filterService.filterStateChangeHandler(this.isMobileView, isFilterClose);
    this.showSubFilterItems();
  }

  showSubFilterItems(index?) {
    if (this.mobileSelectedFilter && typeof index == 'undefined') {
      index = this.allFiltersData.findIndex(val => val.name === this.mobileSelectedFilter.name);
      index = index !== -1 ? index : 0;
    } else if (typeof index === 'undefined') {
      index = 0;
    }
    this.mobileSelectedFilter = this.filterService.showSubFilterItems(index);
  }

  initialDataHandler(): void {
    const initialDataObject = this.filterService.initialDataHandler();
    this.selectedFilters = initialDataObject.selectedFilters;
    this.filtersListWithFilteredValues = initialDataObject.filtersListWithFilteredValues;
    this.allFiltersData = initialDataObject.allFiltersData;
  }

  ngOnInit(): void {
    this.getScreenSize();
    this.initialDataHandler();
    this.showSubFilterItems();
  }


}
