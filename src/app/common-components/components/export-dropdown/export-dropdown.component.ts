import { Component, Input } from '@angular/core';
import { FilterService } from '@app/common-components/components/filter/services/filter.service';
import { SessionStorage } from '@app/shared/models/storage/session-storage.entity';

@Component({
  selector: 'app-export-dropdown',
  templateUrl: './export-dropdown.component.html',
  styleUrls: ['./export-dropdown.component.css']
})
export class ExportDropdownComponent {

  @Input() mobileView = false;
  isMobileView = false;
  sessionStorage: SessionStorage;

  constructor(private filterService: FilterService) {
    this.sessionStorage = new SessionStorage();
  }

  downloadDataAsCsv() {
    const selectedFilters = this.sessionStorage.getSelectedFilters();
    this.filterService.downloadDataAsCsv(selectedFilters);
  }

  filterStateChangeHandler() {
    const isMobileView = true;
    const isFilterClose = true;
    this.filterService.filterStateChangeHandler(isMobileView, isFilterClose);
  }

}
