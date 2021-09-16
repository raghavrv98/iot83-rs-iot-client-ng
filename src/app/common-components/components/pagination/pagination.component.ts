import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@app/base.component';
import { PaginationService } from './services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent extends BaseComponent implements OnInit {

  @Input() lastPage = 1;
  @Input() totalRecordsFiltered: number;

  currentPage = 1;

  pageSizes: number[];

  constructor(
    public paginationService: PaginationService
  ) {
    super();
  }

  getPageSizes() {
    this.pageSizes = this.paginationService.getPageSizes();
  }

  changePageSize(pageSize: number) {
    this.currentPage = 1;
    this.lastPage = this.paginationService.changePageSize(pageSize, this.totalRecordsFiltered);
  }

  onCurrentPageChangeHandler(currentPage) {
    this.currentPage = this.paginationService.onCurrentPageChangeHandler(currentPage, this.lastPage);
  }

  onClickPrevious(backwards) {
    this.currentPage = this.paginationService.onClickPrevious(backwards, this.currentPage);
  }

  onClickNext(fastForward) {
    this.currentPage = this.currentPage = this.paginationService.onClickNext(fastForward, this.currentPage);
  }

  ngOnInit(): void {
    this.getPageSizes();
  }

}
