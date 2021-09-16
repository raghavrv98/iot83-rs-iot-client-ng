import { FormsModule } from '@angular/forms';
import { render } from '@testing-library/angular';
import { BookmarkService } from '../bookmark-control/services/bookmark.service';
import { FilterService } from '../filter/services/filter.service';
import { AddEditBookmarkComponent } from './add-edit-bookmark.component';

render(AddEditBookmarkComponent, {
  imports: [FormsModule]
});

test('it should create BookmarkControl Component', () => {
  const component = new AddEditBookmarkComponent(new BookmarkService(new FilterService()));
  expect(component).toBeTruthy();
});
