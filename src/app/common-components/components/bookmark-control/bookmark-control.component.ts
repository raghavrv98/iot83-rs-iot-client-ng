import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@app/base.component';
import { BookmarkService } from '@app/common-components/components/bookmark-control/services/bookmark.service';
import { SessionStorage } from '@app/shared/models/storage/session-storage.entity';
import { FilterService } from '../filter/services/filter.service';

@Component({
  selector: 'app-bookmark-control',
  templateUrl: './bookmark-control.component.html',
  styleUrls: ['./bookmark-control.component.css']
})

export class BookmarkControlComponent extends BaseComponent implements OnInit {

  @Input() mobileView = false;
  sessionStorage: SessionStorage;

  constructor(public bookmarkService: BookmarkService, private filterService: FilterService) {
    super();
    this.sessionStorage = new SessionStorage();
  }

  initialDataHandler() {
    this.bookmarkService.bookmarkInitialDataHandler();
  }

  deleteSelectedBookmark(name) {
    this.bookmarkService.deleteSelectedBookmark(name,
      this.bookmarkService.bookmarkObject.currentBookmarkName,
      this.bookmarkService.bookmarkObject.bookmarksList);
  }

  searchBookmarkHandler(event: string) {
    const bookmarksList = this.sessionStorage.getBookmarksList();
    this.bookmarkService.bookmarkObject.bookmarkOptions = bookmarksList.filter(val =>
      val.bookmarkName.toLowerCase().includes(event.toLowerCase())
    );
    this.bookmarkService.bookmarkObject.bookmarkPlaceholder = this.sessionStorage.getBookmarkPlaceholder();
  }

  selectedBookmark(name) {
    this.bookmarkService.selectedBookmark(name);
  }

  saveBookmarkHandler() {
    const selectedFilters = this.sessionStorage.getSelectedFilters();
    const bookmarksList = this.sessionStorage.getBookmarksList();
    this.bookmarkService.saveBookmarkHandler(bookmarksList, selectedFilters, this.bookmarkService.bookmarkObject.saveBookmarkName);
    this.bookmarkService.isBookmarkActiveHandler();
  }

  filterStateChangeHandler() {
    const isMobileView = true;
    const isFilterClose = true;
    this.filterService.filterStateChangeHandler(isMobileView, isFilterClose);
  }

  ngOnInit(): void {
    this.initialDataHandler();
  }

}
