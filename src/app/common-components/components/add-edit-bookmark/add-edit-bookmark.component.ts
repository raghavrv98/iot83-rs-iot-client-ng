import { Component } from '@angular/core';
import { BookmarkService } from '@app/common-components/components/bookmark-control/services/bookmark.service';
@Component({
  selector: 'app-add-edit-bookmark',
  templateUrl: './add-edit-bookmark.component.html'
})

export class AddEditBookmarkComponent {

  constructor(public bookmarkService: BookmarkService) { }

  saveBookmarkHandler() {
    const selectedFilters = JSON.parse(sessionStorage.getItem('selectedFilters'));
      const bookmarksList = JSON.parse(sessionStorage.getItem('bookmarksList'));

    this.bookmarkService.saveBookmarkHandler(bookmarksList, selectedFilters, this.bookmarkService.bookmarkObject.saveBookmarkName);
    this.bookmarkService.isBookmarkActiveHandler();
  }

}
