import React, {createContext, useState, useMemo, useEffect} from 'react';
import {type CustomContextProps} from '../prop-types/CustomContextProps';
import {type Bookmark} from '../prop-types/BookmarkProps';
import {type PdfMetaDataProp} from '../prop-types/PdfProps';
import {type RecentDocument} from '../prop-types/RecentDocumentProps';
import Api from './Api';

export const CustomContext = createContext({} as {
	isAuthenticated: boolean;
	handleAuthentication: () => void;
	handleDeauthentication: () => void;
	accessToken: string;
	refreshToken: string;
	username: string;
	updateAccessToken: (newAccessToken: string) => void;
	updateRefreshToken: (newRefreshToken: string) => void;
	updateUsername: (uname: string) => void;
	pdfMetadata: PdfMetaDataProp | undefined;
	updatePdfMetadata: (pdfmetadata: PdfMetaDataProp) => void;
	recentDocuments: RecentDocument[] | undefined;
	addRecentDocuments: (newDocument: RecentDocument) => Promise<void>;
	bookmarks: Bookmark[] | undefined ;
	updateBookmarks: (bookmarks: Bookmark[]) => void;
	addBookmarks: (newBookmark: Bookmark) => Promise<string | undefined>;
	removeBookmarks: (bookmarkToDelete: Bookmark) => Promise<string | undefined>;
	updateExistingBookmark: (existingBookmark: Bookmark) => Promise<Record<string, unknown> | undefined>;
});
export const CustomContextProvider: React.FC<CustomContextProps> = ({children}) => {
	const isLoggedIn = localStorage?.getItem('logged-in');
	const accesstokenStored = localStorage?.getItem('accessToken');
	const refreshtokenStored = localStorage?.getItem('refreshToken');
	const usernameStored = localStorage?.getItem('username');

	const [isAuthenticated, setIsAuthenticated] = useState((isLoggedIn?.toLowerCase() === 'true'));
	const [accessToken, setAccessToken] = useState<string>(accesstokenStored ?? '');
	const [refreshToken, setRefreshToken] = useState<string>(refreshtokenStored ?? '');
	const [username, setUsername] = useState<string>(usernameStored ?? '');
	const [recentDocuments, setRecentDocuments] = useState<RecentDocument[]>([]);
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const [pdfMetadata, setPdfMetadata] = useState<PdfMetaDataProp>({} as PdfMetaDataProp);

	const handleAuthentication = () => {
		setIsAuthenticated(true);
		localStorage.setItem('logged-in', 'true');
	};

	const handleDeauthentication = () => {
		setIsAuthenticated(false);
		localStorage.setItem('logged-in', 'false');
	};

	const updateAccessToken = (newAccessToken: string) => {
		setAccessToken(newAccessToken);
		localStorage.setItem('accessToken', newAccessToken);
	};

	const updateRefreshToken = (newRefreshToken: string) => {
		setRefreshToken(newRefreshToken);
		localStorage.setItem('refreshToken', newRefreshToken);
	};

	const updateUsername = (uname: string) => {
		setUsername(uname);
		localStorage.setItem('username', uname);
	};

	const documentsExists = (documents: RecentDocument[], newDocument: RecentDocument) => {
		const newDocumentExists = documents?.some(document =>
			document?.document_id === newDocument?.document_id,
		);
		return newDocumentExists;
	};

	const getRecentDocuments = async () => {
		if (accessToken?.length > 0 && username?.length > 0) {
			try {
				const pathParamters = {
					username,
				};
				const recentDocs: unknown = await Api.getWithParams(`${process.env.REACT_APP_API_ENDPOINT!}/opened-documents/username`, pathParamters, accessToken);
				setRecentDocuments(recentDocs as RecentDocument[]);
			} catch (error) {
				setRecentDocuments([] as RecentDocument[]);
			}
		}
	};

	const addRecentDocuments = async (newDocument: RecentDocument) => {
		const recentDocs = recentDocuments;
		if (!documentsExists(recentDocs, newDocument) && accessToken?.length > 0 && username?.length > 0) {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/opened-documents`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(newDocument),
				});

				const data: unknown = await response.json();
				if ((data as Record<string, unknown>)?.response === 'Opened documents are inserted successfully') {
					setRecentDocuments(prevDocuments => [...prevDocuments, newDocument]);
				}
			} catch (error) {
			}
		}
	};

	const updatePdfMetadata = (pdfmetadata: PdfMetaDataProp) => {
		setPdfMetadata(pdfmetadata);
		localStorage.setItem('pdfMetadata', JSON.stringify(pdfMetadata));
	};

	const updateBookmarks = (bookmarks: Bookmark[]) => {
		setBookmarks(bookmarks);
	};

	const getBookmarks = async () => {
		if (accessToken?.length > 0 && username?.length > 0) {
			try {
				const pathParamters = {
					username,
				};
				const data: unknown = await Api.getWithParams(`${process.env.REACT_APP_API_ENDPOINT!}/bookmarks/username`, pathParamters, accessToken);
				updateBookmarks(data as Bookmark[]);
			} catch (error) {
				updateBookmarks([] as Bookmark[]);
			}
		}
	};

	const addBookmarks = async (newBookmark: Bookmark) => {
		const recentBookmarks = recentDocuments;
		if (accessToken?.length > 0 && username?.length > 0) {
			try {
				const data: unknown = await Api.postWithAuthWithBody(`${process.env.REACT_APP_API_ENDPOINT!}/bookmarks`, JSON.stringify(newBookmark), accessToken);
				if ((data as Record<string, unknown>)?.response === 'bookmark is inserted successfully') {
					newBookmark.bookmark_id = (data as Record<string, unknown>).bookmark_id as string;
					setBookmarks(prevBookmarks => [...prevBookmarks, newBookmark]);
					return 'bookmark is inserted successfully';
				}
			} catch (error) {
			}
		}
	};

	const updateExistingBookmark = async (existingBookmark: Bookmark) => {
		try {
			const data: unknown = await Api.putWithAuthWithBody(`${process.env.REACT_APP_API_ENDPOINT!}/bookmark`, JSON.stringify(existingBookmark), accessToken);
			if ((data as Record<string, unknown>)?.response === 'Bookmark updated successfully') {
				return 'Bookmark updated successfully';
			}

			return {};
		} catch (error) {}
	};

	const removeBookmarks = async (bookmarkToDelete: Bookmark) => {
		const bookms = bookmarks;
		try {
			const pathParams = {
				username,
				bookmarkId: bookmarkToDelete?.bookmark_id ?? '',
			};
			const data: unknown = await Api.deleteWithAuthWithParams(
				`${process.env.REACT_APP_API_ENDPOINT!}/bookmarks/username/bookmarkId`,
				pathParams,
				accessToken,
			);
			if ((data as Record<string, unknown>)?.response === 'Bookmark is deleted successfully') {
				const updatedBookmarks = bookms.filter(
					bookmark =>
						bookmark.bookmark_id !== bookmarkToDelete.bookmark_id
						|| bookmark.document_id !== bookmarkToDelete.document_id
					|| bookmark.bookmark_name !== bookmarkToDelete.bookmark_name
					|| bookmark.section_name !== bookmarkToDelete.section_name
					|| bookmark.bookmark_note !== bookmarkToDelete.bookmark_note
					|| bookmark.bookmark_page !== bookmarkToDelete.bookmark_page
					|| bookmark.document_title !== bookmarkToDelete.document_title,
				);
				setBookmarks(updatedBookmarks);
				return 'Bookmark is deleted successfully';
			}
		} catch (error) {
		}
	};

	useEffect(() => {
		getRecentDocuments().catch(error => error as Error);
		getBookmarks().catch(error => error as Error);
	}, [accessToken, username]);

	const contextValue = useMemo(() => ({
		recentDocuments,
		addRecentDocuments,
		bookmarks,
		addBookmarks,
		pdfMetadata,
		updatePdfMetadata,
		removeBookmarks,
		updateAccessToken,
		updateRefreshToken,
		updateUsername,
		accessToken,
		refreshToken,
		username,
		isAuthenticated,
		handleAuthentication,
		handleDeauthentication,
		updateExistingBookmark,
		updateBookmarks}),
	[recentDocuments,
		addRecentDocuments,
		bookmarks,
		addBookmarks,
		pdfMetadata,
		updatePdfMetadata,
		removeBookmarks,
		username,
		updateUsername,
		refreshToken,
		updateRefreshToken,
		accessToken,
		updateAccessToken,
		isAuthenticated,
		handleAuthentication,
		handleDeauthentication,
		updateExistingBookmark,
		updateBookmarks]);

	return (
		<CustomContext.Provider value={contextValue}>
			{children}
		</CustomContext.Provider>
	);
};
