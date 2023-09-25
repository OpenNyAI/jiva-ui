import {type HamburgerMenuProps} from './MenuProps';

type BookmarkDocColumn = {
	id: 'docTitle' | 'savedPages';
	label: JSX.Element | string;
	minWidth?: number;
	align?: 'right' | 'left';
	format?: (value: string) => JSX.Element | string;
};
type BookmarkColumn = {
	id: 'slot' | 'bookmark_name' | 'bookmark_page';
	label: JSX.Element | string;
	minWidth?: number;
	align?: 'right' | 'left';
	format?: (value: string) => JSX.Element | string;
};

type Data = {
	bookmark: string;
	savedPages: string;
	type: number;
	dateAdded: number;
};

type TransformedObject = {
	docId: string;
	docTitle: string;
	bookmarks: Bookmark[];
	savedPages: number;
};
type BookmarkDocsTableProps = {
	bookmarks: TransformedObject[];
};
type Bookmark = {
	bookmark_id?: string;
	email_id: string;
	document_id: string;
	section_name: string;
	bookmark_name: string;
	bookmark_note: string;
	bookmark_page: number;
	document_title: string;

};
type BookmarkEditMenuprops = HamburgerMenuProps & {
	bookmark: Bookmark;
	deleteBookmark: () => void;
	editBookmark: () => void;
};
type BookmarksTableProps = {
	bookmarks: Bookmark[];
	deleteBookmark?: (bookmark: Bookmark) => Promise<void>;
	editBookmark?: (page: number) => void;
	handleDeleted: () => void;
	isDeleted: boolean;
	isBookmarkDeletionUndo: boolean;
};
type BookmarkDocCardProps = {
	docTitle: string;
	savedPages: number;
	navigateDoc: () => void;
};

export type{BookmarkEditMenuprops, Bookmark, BookmarkColumn, BookmarkDocColumn, Data, TransformedObject, BookmarksTableProps, BookmarkDocsTableProps, BookmarkDocCardProps};
