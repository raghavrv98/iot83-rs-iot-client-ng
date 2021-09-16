import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PaginationComponent } from './components/pagination/pagination.component';
import { FilterComponent } from './components/filter/filter.component';
import { AlarmNotificationComponent } from './components/alarm-notification/alarm-notification.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookmarkControlComponent } from './components/bookmark-control/bookmark-control.component';
import { AddEditBookmarkComponent } from './components/add-edit-bookmark/add-edit-bookmark.component';
import { ExportDropdownComponent } from './components/export-dropdown/export-dropdown.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    PaginationComponent,
    FilterComponent,
    AlarmNotificationComponent,
    SearchBarComponent,
    BookmarkControlComponent,
    AddEditBookmarkComponent,
    ExportDropdownComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  exports: [PaginationComponent, FilterComponent],
})
export class CommonComponentsModule { }
