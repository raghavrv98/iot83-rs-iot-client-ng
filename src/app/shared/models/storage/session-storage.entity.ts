import { AlarmDetails } from '@app/shared/models/device.entity';
import { FILTER_JSON, FILTER_LIST_WITH_VALUES, SELECTED_FILTERS } from '@app/shared/data/filter-data';
import { BookmarkList } from '../bookmark.entity';
import { FilterItem, FiltersListWithValues, SelectedFilters } from '../filter-items.entity';

export class SessionStorage {
    private isFilterMenuOpen = false;

    getSelectedFilters() {
        return sessionStorage.getItem('selectedFilters') ? JSON.parse(sessionStorage.getItem('selectedFilters')) : SELECTED_FILTERS;
    }

    setSelectedFilters(selectedFilters: SelectedFilters[]) {
        sessionStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    }

    getFiltersListWithFilteredValues() {
        return sessionStorage.getItem('filtersListWithFilteredValues') ?
        JSON.parse(sessionStorage.getItem('filtersListWithFilteredValues')) :
        FILTER_LIST_WITH_VALUES;
    }

    setFiltersListWithFilteredValues(filtersListWithFilteredValues: FiltersListWithValues[]) {
        sessionStorage.setItem('filtersListWithFilteredValues', JSON.stringify(filtersListWithFilteredValues));
    }

    getAllFiltersData() {
        return sessionStorage.getItem('allFiltersData') ? JSON.parse(sessionStorage.getItem('allFiltersData')) : FILTER_JSON;
    }

    setAllFiltersData(allFiltersData: FilterItem[]) {
        sessionStorage.setItem('allFiltersData', JSON.stringify(allFiltersData));
    }

    getIsFilterMenuOpen() {
        return sessionStorage.getItem('isFilterMenuOpen') ? JSON.parse(sessionStorage.getItem('isFilterMenuOpen')) : this.isFilterMenuOpen;
    }

    setIsFilterMenuOpen(isFilterMenuOpen: boolean) {
        sessionStorage.setItem('isFilterMenuOpen', JSON.stringify(isFilterMenuOpen));
    }

    getBookmarksList() {
        return sessionStorage.getItem('bookmarksList') ? JSON.parse(sessionStorage.getItem('bookmarksList')) : [];
    }

    setBookmarksList(bookmarksList: BookmarkList[]) {
        sessionStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));;
    }

    getBookmarkPlaceholder() {
        return JSON.parse(sessionStorage.getItem('bookmarkPlaceholder'));
    }

    setBookmarkPlaceholder(bookmarkPlaceholder: string) {
        sessionStorage.setItem('bookmarkPlaceholder', JSON.stringify(bookmarkPlaceholder));
    }

    getNotificationAlarmData() {
        return JSON.parse(sessionStorage.getItem('notificationAlarmData'));
    }

    setNotificationAlarmData(notificationAlarmData: AlarmDetails[]) {
        sessionStorage.setItem('notificationAlarmData', JSON.stringify(notificationAlarmData));
    }

    getBookmarkName() {
        return sessionStorage.getItem('bookmarkName') ? JSON.parse(sessionStorage.getItem('bookmarkName')) : '';
    }

    setBookmarkName(bookmarkName: string) {
        sessionStorage.setItem('bookmarkName', JSON.stringify(bookmarkName));
    }


}
