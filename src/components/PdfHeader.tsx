/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import {type PdfHeaderProps} from '../prop-types/MenuProps';
import {Alert, Button, Divider, Snackbar, Tooltip} from '@mui/material';
import Zoom from '@mui/material/Zoom';
import {saveAs} from 'file-saver';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import {useEffect, useState} from 'react';
import {type BotDocumentResult} from '../prop-types/BotMessageProps';
import Information from './Information';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditionMenu from './EditionMenu';
import Header from './Header';
import NotificationsIcon from '../assets/Notifications.svg';
import BookmarkCard from './BookmarkCard';
import {CustomContext} from '../utilities/CustomContext';
import ShareMenu from './ShareMenu';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchWord from './SearchWord';
import Notification from './Notifications';
import {type Bookmark} from '../prop-types/BookmarkProps';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import {type PdfMetaDataProp} from '../prop-types/PdfProps';
type PdfProp = {
	pdfMetadata: PdfMetaDataProp;
};

const PdfHeader: React.FC<PdfHeaderProps> = ({openMenu, handleOpenMenu, handleOpenDocument, pdfMetaData}) => {
	const location = useLocation();
	const {addBookmarks, bookmarks, removeBookmarks, username, updatePdfMetadata, updateExistingBookmark} = React.useContext(CustomContext);
	const id = pdfMetaData?.metadata?.documentInformation?.id;
	const url = pdfMetaData?.metadata?.documentInformation?.public_url;
	const downloadTitle = pdfMetaData?.metadata?.documentInformation?.title;
	const [editionId, setEditionId] = useState<string | undefined>(id);
	const [bookmarked, setBookmarked] = useState<boolean>(false);
	const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);
	const [bookmarkInformation, setBookMarkInformation] = useState<Bookmark>({} as Bookmark);
	const handleClose = () => {
		setBookmarkSuccess(false);
	};

	const handleCloseCopied = () => {
		setCopied(false);
	};

	const handleSearchWord = (searchTerm: string) => {
		navigate({
			pathname: `/pdf/${id}/${String(pdfMetaData?.pageNo)}`,
			search: `?search=${searchTerm}`,
		});
	};

	useEffect(() => {
		if (Object.keys(pdfMetaData)?.length <= 0) {
			updatePdfMetadata(JSON.parse(localStorage?.getItem('pdfMetadata') ?? '{}') as PdfMetaDataProp ?? {});
		}
	}, []);
	useEffect(() => {
		const bookMarksPresent = bookmarks?.filter(bookmark => bookmark?.document_id === id).filter(bookmark => bookmark?.bookmark_page === pdfMetaData?.pageNo);
		setBookMarkInformation(bookMarksPresent![0]);
		if (bookMarksPresent !== undefined && bookMarksPresent?.length > 0) {
			setBookmarked(true);
		} else {
			setBookmarked(false);
		}
	}, [pdfMetaData, bookmarkSuccess]);
	const [copied, setCopied] = useState<boolean>(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(window.location.href)
			.then(() => {
				setCopied(true);
			})
			.catch(error => {
				console.error('Failed to copy:', error);
			});
	};

	const handleBookmark = async (newBookmarkName: string, newBookmarkNote: string) => {
		const newBookMark: Bookmark = {
			email_id: username,
			document_id: id!,
			section_name: pdfMetaData?.pageTitle ?? '',
			bookmark_name: newBookmarkName,
			bookmark_note: newBookmarkNote,
			bookmark_page: pdfMetaData?.pageNo,
			document_title: pdfMetaData?.metadata?.documentInformation?.title,
		};

		const resp = await addBookmarks(newBookMark);
		handleBookmarkCardClose();
		if (resp === 'bookmark is inserted successfully') {
			setBookmarked(true);
			setBookmarkSuccess(true);
		}
	};

	const updateBookmark = async (newBookmarkName: string, newBookmarkNote: string) => {
		const existingBookmark: Bookmark = {
			...bookmarkInformation,
			bookmark_name: newBookmarkName,
			bookmark_note: newBookmarkNote,
		};

		const resp: unknown = await updateExistingBookmark(existingBookmark);
		handleBookmarkCardClose();
		if (resp === 'Bookmark updated successfully') {
			setBookmarked(true);
			setBookmarkSuccess(true);
		}
	};

	const removeBookmark = async (bookMark: Bookmark) => {
		const resp = await removeBookmarks(bookMark);
		handleBookmarkCardClose();
		if (resp === 'Bookmark is deleted successfully') {
			setBookmarked(false);
			setBookmarkSuccess(false);
		}
	};

	const handleEdition = async (documentId: string) => {
		const document = pdfMetaData?.metadata?.actInformation?.documents?.filter(edition => edition?.id === documentId);
		if (document !== undefined) {
			const metadata: BotDocumentResult = {
				documentInformation: document[0],
				actInformation: pdfMetaData?.metadata?.actInformation,
			};
			if (handleOpenDocument !== undefined && document[0]?.id !== undefined) {
				handleOpenDocument(document[0]?.id, 1);
			}
		}
	};

	const [anchorHamburger, setAnchorHamburger] = React.useState<undefined | HTMLElement>(undefined);
	const openHamburger = Boolean(anchorHamburger);
	const handleClickHamburgerMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorHamburger(event.currentTarget);
	};

	const handleCloseHamburgerMenu = () => {
		setAnchorHamburger(undefined);
	};

	const [anchorInformation, setAnchorInformation] = React.useState<undefined | HTMLElement>(undefined);
	const openInformation = Boolean(anchorInformation);
	const handleClickInformation = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorInformation(event.currentTarget);
	};

	const handleCloseInformation = () => {
		setAnchorInformation(undefined);
	};

	const [anchorEdition, setAnchorEdition] = React.useState<undefined | HTMLElement>(undefined);
	const openEdition = Boolean(anchorEdition);
	const handleClickEdition = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEdition(event.currentTarget);
	};

	const handleCloseEdition = () => {
		setAnchorEdition(undefined);
	};

	const [anchorBookmarkCard, setAnchorBookmarkCard] = React.useState<undefined | HTMLElement>(undefined);
	const openBookmarkCard = Boolean(anchorBookmarkCard);
	const handleBookmarkCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorBookmarkCard(event.currentTarget);
	};

	const handleBookmarkCardClose = () => {
		setAnchorBookmarkCard(undefined);
	};

	const [anchorSearchWord, setAnchorSearchWord] = React.useState<undefined | HTMLElement>(undefined);
	const openSearchWord = Boolean(anchorSearchWord);
	const handleSearchWordClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorSearchWord(event.currentTarget);
	};

	const handleSearchWordClose = () => {
		setAnchorSearchWord(undefined);
	};

	const [anchorNotification, setAnchorNotification] = React.useState<undefined | HTMLElement>(undefined);
	const openNotification = Boolean(anchorNotification);
	const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorNotification(event.currentTarget);
	};

	const handleNotificationClose = () => {
		setAnchorNotification(undefined);
	};

	const onDownloadClick = () => {
		saveAs(String(url), downloadTitle);
	};

	const onPrint = () => {
		const contentWindow = window.open(url, '_blank');
		if (contentWindow) {
			contentWindow.onload = () => {
				contentWindow.print();
				contentWindow.close();
			};
		}
	};

	const navigate = useNavigate();
	const subHeaderMenu = (<>
		<Tooltip TransitionComponent={Zoom} title={<span style={{fontSize: '15px'}}>Editions</span>} arrow>
			<Button
				endIcon={<ArrowDropDownIcon sx={{color: '#9B9C9E'}}/>}
				onClick={handleClickEdition}
				sx={{borderRadius: '4px', border: '1px solid #222427', background: '#222427', color: 'white', minWidth: '150px'}}
			>Edition {pdfMetaData?.metadata?.documentInformation?.publish_date?.substring(0, 4)?.trim()}
			</Button>
		</Tooltip>
		<EditionMenu anchorEdition={anchorEdition} openEdition={openEdition} handleCloseEditionMenu={handleCloseEdition} editions={pdfMetaData?.metadata?.actInformation?.documents} handleEdition={handleEdition}/>
		<Tooltip TransitionComponent={Zoom} title={<span style={{fontSize: '15px'}}>Word/Line Search</span>} arrow>
			<IconButton size='large' color='inherit' onClick={handleSearchWordClick} style={{borderRadius: '30px'}}>
				<SearchIcon sx={{color: 'white'}}/>
			</IconButton>
		</Tooltip>
		<Tooltip TransitionComponent={Zoom} title={<span style={{fontSize: '15px'}}>Notifications</span>} arrow>
			<IconButton size='large' color='inherit' onClick={handleNotificationClick} style={{borderRadius: '30px'}}>
				<BackupTableIcon sx={{color: 'white'}}/>
			</IconButton>
		</Tooltip>
		<Tooltip TransitionComponent={Zoom} title={<span style={{fontSize: '15px'}}>Act Information</span>} arrow>
			<IconButton size='large' color='inherit' onClick={handleClickInformation} style={{borderRadius: '30px'}}>
				<InfoOutlinedIcon/>
			</IconButton>
		</Tooltip>
		<Divider orientation='vertical'/>
		<Tooltip TransitionComponent={Zoom} title={<span style={{fontSize: '15px'}}>Bookmark</span>} arrow>
			{bookmarked ? <IconButton size='large' aria-label='show 4 new mails' color='inherit' onClick={handleBookmarkCardClick} style={{borderRadius: '30px'}}>
				<BookmarkIcon sx={{color: '#5571C2'}}/>
			</IconButton>
				: <IconButton size='large' aria-label='show 4 new mails' color='inherit' onClick={handleBookmarkCardClick} style={{borderRadius: '30px'}}>
					<BookmarkBorderOutlinedIcon/>
				</IconButton>}
		</Tooltip>
		<Tooltip TransitionComponent={Zoom} title={<span style={{fontSize: '15px'}}>Share</span>} arrow>
			<IconButton size='large' aria-label='show 4 new mails' color='inherit' onClick={handleClickHamburgerMenu} style={{borderRadius: '30px'}}>
				<ShareOutlinedIcon/>
			</IconButton>
		</Tooltip>
		<SearchWord anchorSearchWord={anchorSearchWord} handleSearchWordClose={handleSearchWordClose} openSearchWord={openSearchWord} handleSearchWord={handleSearchWord}/>
		<BookmarkCard updateBookmark={updateBookmark} anchorBookmarkCard={anchorBookmarkCard} handleBookmarkCardClose={handleBookmarkCardClose} openBookmarkCard={openBookmarkCard} metadata={pdfMetaData} handleBookmark={handleBookmark} bookmarkInformation={bookmarkInformation} removeBookmark={removeBookmark}/>
		<Information anchorInformation={anchorInformation} handleCloseInformation={handleCloseInformation} openInformation={openInformation} metadata={pdfMetaData?.metadata}/>
		<Notification anchorNotification={anchorNotification} handleCloseNotification={handleNotificationClose} openNotification={openNotification} metadata={pdfMetaData?.metadata}/>
		<ShareMenu anchorHamburger={anchorHamburger} handleCloseHamburgerMenu={handleCloseHamburgerMenu} openHamburger={openHamburger} handleCopy={handleCopy} copied={copied} onDownloadClick={onDownloadClick} onPrint={onPrint}/>
		<Snackbar
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			open={bookmarkSuccess}
			autoHideDuration={5000}
			onClose={handleClose}
			message='Your document is saved!'
		><Alert severity='success'>Your document is saved! <div onClick={() => {
				navigate('/bookmarks');
			}} style={{cursor: 'pointer'}}>Go to Bookmarks</div></Alert></Snackbar>
		<Snackbar
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			open={copied}
			autoHideDuration={5000}
			onClose={handleCloseCopied}
			message='Link is copied!'
		><Alert severity='success'>Link is copied!</Alert></Snackbar></>);
	return (
		<Header openMenu={openMenu} handleOpenMenu={handleOpenMenu} handleOpenDocument={handleOpenDocument} headerText={pdfMetaData?.metadata?.documentInformation?.title} subHeaderMenu={subHeaderMenu}/>

	);
};

export default PdfHeader;
