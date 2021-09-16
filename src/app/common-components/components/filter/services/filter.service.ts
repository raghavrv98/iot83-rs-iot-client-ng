import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterItem, SubFilterItem } from '@app/shared/models/filter-items.entity';
import * as _ from 'lodash';
import { SessionStorage } from '@app/shared/models/storage/session-storage.entity';
@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterSubject = new Subject();
  downloadSubject = new Subject();
  isFilterMenuOpen = false;
  sessionStorage: SessionStorage;

  constructor() {
    this.sessionStorage = new SessionStorage();
  }

  initialDataHandler() {
    const initialDataObject = {
      selectedFilters: this.sessionStorage.getSelectedFilters(),
      filtersListWithFilteredValues: this.sessionStorage.getFiltersListWithFilteredValues(),
      allFiltersData: this.sessionStorage.getAllFiltersData(),
    };
    initialDataObject.allFiltersData = this.getFilterData(initialDataObject.allFiltersData,
      initialDataObject.filtersListWithFilteredValues);
    this.isFilterMenuOpen = this.sessionStorage.getIsFilterMenuOpen();
    this.sessionStorage.setSelectedFilters(initialDataObject.selectedFilters);
    this.sessionStorage.setFiltersListWithFilteredValues(initialDataObject.filtersListWithFilteredValues);
    this.sessionStorage.setAllFiltersData(initialDataObject.allFiltersData);
    this.sessionStorage.setIsFilterMenuOpen(this.isFilterMenuOpen);
    return initialDataObject;
  }

  getFilterData(allFiltersData, filtersListWithFilteredValues) {
    allFiltersData = allFiltersData.map(val => {
      if (val.display) {
        const filteredValues = filtersListWithFilteredValues.find(value => value.name === val.name).filteredValues;
        val.subFilters.map(sub => {
          if (filteredValues.includes(val.name === 'unit' ? sub.name : sub.displayName)) {
            sub.checked = true;
          } else {
            sub.checked = false;
          }
          return sub;
        });
      }
      return val;
    });

    return allFiltersData;
  }

  applyFilter(item: FilterItem, subItem: SubFilterItem, isBookmarkActive) {
    const filtersListWithFilteredValues = this.sessionStorage.getFiltersListWithFilteredValues();
    let allFiltersData = this.sessionStorage.getAllFiltersData();
    let selectedFilters = this.sessionStorage.getSelectedFilters();
    const filteredIndex = allFiltersData.findIndex(filterDatum => filterDatum.name === item.name);

    allFiltersData[filteredIndex].subFilters[allFiltersData[filteredIndex].
      subFilters.findIndex(subFilterDatum => subFilterDatum.name === subItem.name)].checked = subItem.checked;

    filtersListWithFilteredValues.map(filterDatum => {
      if (filterDatum.name === item.name) {
        if (filterDatum.filteredValues.includes(item.name === 'unit' ? subItem.name : subItem.displayName)) {
          filterDatum.filteredValues.
            splice(filterDatum.filteredValues.
              indexOf(item.name === 'unit' ? subItem.name : subItem.displayName), 1);
        } else {
          filterDatum.filteredValues.push(item.name === 'unit' ? subItem.name : subItem.displayName);
        }
      }
    });
    if (subItem.checked) {
      if (selectedFilters.findIndex(val => val.filterId === item.name) !== -1) {
        selectedFilters[selectedFilters.
          findIndex(val => val.filterId === item.name)].subFilterNames.
          push(item.name === 'unit' ? subItem.name : subItem.displayName);
      } else {
        selectedFilters.push({ filterId: item.name, subFilterNames: [item.name === 'unit' ? subItem.name : subItem.displayName] });
      }
    } else {
      if (selectedFilters.findIndex(val => val.filterId === item.name) !== -1) {
        const arr = selectedFilters.find(val => val.filterId === item.name);
        arr.subFilterNames.
          splice(arr.subFilterNames.
            findIndex(val => val === (item.name === 'unit' ? subItem.name : subItem.displayName)), 1);
      }
      selectedFilters = selectedFilters.filter(val => val.subFilterNames.length !== 0);
    }

    allFiltersData = this.getFilterData(allFiltersData, filtersListWithFilteredValues);
    this.sessionStorage.setAllFiltersData(allFiltersData);
    this.sessionStorage.setFiltersListWithFilteredValues(filtersListWithFilteredValues);
    this.sessionStorage.setSelectedFilters(selectedFilters);
    this.filterSubject.next(selectedFilters);
    const bookmarkTitle = this.sessionStorage.getBookmarkName().length === 0 ?
      'Save Bookmark' :
      isBookmarkActive ?
        'Saved Bookmark' :
        'Edited';
    const applyFilterObject = { filtersListWithFilteredValues, bookmarkTitle };

    return applyFilterObject;
  }

  filterStateChangeHandler(isMobileView, isFilterClose: boolean = false) {
    if (isFilterClose) {
      return this.isFilterMenuOpen = false;
    }
    if (!isMobileView) {
      this.isFilterMenuOpen = this.sessionStorage.getIsFilterMenuOpen();
      this.isFilterMenuOpen = !this.isFilterMenuOpen;
      this.sessionStorage.setIsFilterMenuOpen(this.isFilterMenuOpen);
    }
    else {
      this.isFilterMenuOpen = !this.isFilterMenuOpen;
    }
    return this.isFilterMenuOpen;
  }

  appliedFilterHandler(name) {
    const selectedFilters = this.sessionStorage.getSelectedFilters();
    const filterIdIndex = selectedFilters.findIndex(val => val.filterId === name);
    let tagName = '';
    tagName = selectedFilters[filterIdIndex] ?
      selectedFilters[filterIdIndex].subFilterNames.length === 1 ?
        tagName = ': ' + selectedFilters[filterIdIndex].subFilterNames[0] :
        `: ${selectedFilters[filterIdIndex].subFilterNames.length} items` : '';
    return tagName;
  }

  searchBoxFilter(val, searchSubFilter) {
    const allFiltersData = this.sessionStorage.getAllFiltersData();
    const filtersListWithFilteredValues = this.sessionStorage.getFiltersListWithFilteredValues();
    const filteredObjectIndex = allFiltersData.findIndex(value => val.displayName === value.displayName);

    let filteredDataArray = allFiltersData;

    filteredDataArray = this.getFilterData(filteredDataArray, filtersListWithFilteredValues);
    allFiltersData[filteredObjectIndex].subFilters = filteredDataArray[filteredObjectIndex].subFilters.
      filter(obj => obj.displayName.toLowerCase().includes(searchSubFilter.toLowerCase()));
    return allFiltersData;
  }

  downloadDataAsCsv(selectedFilters) {
    this.downloadSubject.next(selectedFilters);
  }

  showSubFilterItems(idx) {
    let element;
    const allFiltersData = this.sessionStorage.getAllFiltersData();
    allFiltersData.map((value, index) => {
      if (idx === index) { element = value; }
    });
    return element;
  }

}
