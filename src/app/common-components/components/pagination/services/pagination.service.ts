import { Injectable } from '@angular/core';
import { PAGE_SIZES } from '../pagination-data';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  deviceOffset = 0;
  devicePerPage = 50;
  lastPage: number;

  constructor() { }

  getPageSizes() {
    return PAGE_SIZES;
  }

  changePageSize(pageSize, totalRecordsFiltered) {
    const lastPage = Math.ceil(totalRecordsFiltered / pageSize);
    this.deviceOffset = 0;
    this.devicePerPage = pageSize;
    return lastPage;
  }

  onCurrentPageChangeHandler(currentPage, lastPage) {
    currentPage = currentPage > lastPage ? lastPage : currentPage < 1 ? 1 : currentPage;
    this.deviceOffset = (this.devicePerPage * currentPage) - this.devicePerPage;
    return currentPage;
  }

  onClickPrevious(fastBackward, currentPage) {
    this.deviceOffset = fastBackward ? this.deviceOffset - 3 * this.devicePerPage : this.deviceOffset - this.devicePerPage;
    currentPage = fastBackward ? currentPage - 3 : currentPage - 1;
    return currentPage;
  }

  onClickNext(fastForward, currentPage) {
    this.deviceOffset = fastForward ? this.deviceOffset + 3 * this.devicePerPage : this.deviceOffset + this.devicePerPage;
    currentPage = fastForward ? currentPage + 3 : currentPage + 1;
    return currentPage;
  }


}
