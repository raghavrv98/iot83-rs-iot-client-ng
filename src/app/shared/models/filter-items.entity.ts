export class FilterItem {
  display: boolean;
  displayName: string;
  subFilters: SubFilterItem[];
  name: string;
}

export class SubFilterItem {
  displayName: string;
  checked: boolean;
  name: string;
}

export class FiltersListWithValues {
  name: string;
  filteredValues: string[];
}

export class SelectedFilters {
  filterId: string;
  subFilterNames: string[];
}
