import { BookmarkList } from './bookmark.entity';

export class BookmarkResponse {
    bookmarksList: BookmarkList[];
    bookmarkOptions: BookmarkList[];
    bookmarkPlaceholder: string;
    currentBookmarkName: string;
    bookmarkTitle: string;
    saveBookmarkName: string;
}
