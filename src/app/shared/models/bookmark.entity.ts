import { SelectedFilters } from './filter-items.entity';

export class BookmarkList {
  bookmarkName: string;
  bookmarkFilters: BookmarkFilter[];
  selectedFilters: SelectedFilters[];
}

export class BookmarkFilter {
  name: string;
  filteredValues: string[];
}
