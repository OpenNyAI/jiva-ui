import {type DocumentMetaData} from '@opennyai/jiva-user-api';
import {type ReactElement} from 'react';
import {type BotDocumentResult} from './BotMessageProps';
import {type Bookmark} from './BookmarkProps';

type PdfMetaDataProp = {
	metadata: BotDocumentResult;
	pageNo: number;
	toc?: unknown;
	pageTitle?: string;
	handlePageNumberInUrl?: (pageNumber: number) => void;
	isBookmarked?: boolean;
};

type EditionsListProps = {
	editions: DocumentMetaData[] | undefined;
	changeEdition: (editionId: string) => Promise<void>;
};
type PdfRendererProps = {
	metadata: BotDocumentResult;
	pageNo: number;
	toc?: unknown;
	handlePageNumberInUrl?: ((pageNumber: number) => void) | undefined;
	handlePageChange: (value: string) => void;
	handlePreviousPage: () => void;
	handleNextPage: () => void;
	onDocumentLoadSuccess: ({numPages}: {
		numPages: number;
	}) => void;
	numPages: number;
	pageNumber: number;
	section: string;
	searchinPdf?: string;
	zoom?: number;
};
type SearchModalProps = {
	openSearchModal: boolean;
	handleOpenSearchModal: () => void;
	handleCloseSearchModal: () => void;
	component?: ReactElement<any, any>;
};
type BookmarkCardProps = {
	anchorBookmarkCard: undefined | HTMLElement;
	openBookmarkCard: boolean;
	handleBookmarkCardClose: () => void;
	metadata?: PdfMetaDataProp;
	handleBookmark: (newBookmarkName: string, newBookmarkNote: string) => Promise<void>;
	bookmarkInformation: Bookmark;
	removeBookmark: (bookMark: Bookmark) => Promise<void>;
	updateBookmark: (newBookmarkName: string, newBookmarkNote: string) => Promise<void>;

};
type NotificationProps = {
	anchorNotification: undefined | HTMLElement;
	openNotification: boolean;
	handleCloseNotification: () => void;
	metadata?: BotDocumentResult;
};
type SearchWordProps = {
	anchorSearchWord: undefined | HTMLElement;
	openSearchWord: boolean;
	handleSearchWordClose: () => void;
	handleSearchWord: (searchTerm: string) => void;
};

type ShareMenuProps = {
	anchorHamburger: undefined | HTMLElement;
	openHamburger: boolean;
	handleCloseHamburgerMenu: () => void;
	handleCopy?: () => void;
	copied?: boolean;
	onDownloadClick?: () => void;
	onPrint?: () => void;
};

export type {EditionsListProps, SearchModalProps, BookmarkCardProps, PdfRendererProps, SearchWordProps, ShareMenuProps, NotificationProps, PdfMetaDataProp};
