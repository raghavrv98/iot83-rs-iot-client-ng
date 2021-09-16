import { Component, Input } from '@angular/core';
import { FilterService } from '../filter/services/filter.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

  @Input() mobileView = false;

  constructor(private filterService: FilterService) { }

  filterStateChangeHandler() {
    const isMobileView = true;
    const isFilterClose = true;
    this.filterService.filterStateChangeHandler(isMobileView, isFilterClose);
  }
}
