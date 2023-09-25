
import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Alert, Grid, Snackbar, Typography} from '@mui/material';
import {useLocation} from 'react-router-dom';
import './Chatbot.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../components/PDFRenderer.css';
import {BookmarksTable} from '../components/BookmarkTable';
import BookmarkDocCard from '../components/BookmarkDocCard';
import {type Bookmark, type TransformedObject} from '../prop-types/BookmarkProps';
import {CustomContext} from '../utilities/CustomContext';

type BookmarkState = {
	row: TransformedObject;
};
const SubBookmarks: React.FC = () => {
	const navigate = useNavigate();
	const goToBookmarks = () => {
		navigate('/bookmarks');
	};

	const {removeBookmarks, addBookmarks} = useContext(CustomContext);
	const {docId} = useParams();
	const [deletedBookmark, setDeletedBookmark] = useState<Bookmark>({} as Bookmark);
	const location = useLocation();
	const {row} = location.state as BookmarkState;
	const [savedPages, setSavedPages] = useState<number>(row?.savedPages);
	const [savedPagesChange, setSavedPagesChange] = useState<boolean>(false);
	const [isUndone, setIsUndone] = useState<boolean>(false);
	const editBookmark = (page: number) => {
		navigate(`/pdf/${docId!}/${String(page)}`);
	};

	const deleteBookmark = async (bookmark: Bookmark) => {
		setDeletedBookmark(bookmark);
		await removeBookmarks(bookmark);
	};

	const undoDeleteBookmark = async () => {
		setIsUndone(true);
		await addBookmarks(deletedBookmark);
		setIsDeleted(false);
		const pages = savedPages;
		setSavedPages(pages + 1);
	};

	const goToDocument = () => {
		navigate(`/pdf/${docId!}/1`);
	};

	const [isDeleted, setIsDeleted] = useState(false);
	const handleDeleted = () => {
		setIsUndone(false);
		setIsDeleted(true);
		setSavedPagesChange(true);
	};

	useEffect(() => {
		if (savedPagesChange) {
			const pages = savedPages;
			setSavedPages(pages - 1);
			setSavedPagesChange(false);
		}
	}, [savedPagesChange]);

	return (<>
		<Grid container width={500} onClick={goToBookmarks} sx={{cursor: 'pointer'}}>
			<Grid item xs={1} mt={0.5}><ArrowBackIcon/></Grid>
			<Grid item xs={8}><Typography variant='h6' mb={2}>Back to All Bookmarks</Typography></Grid>
		</Grid>
		<Grid container>
			<Grid item xs={3}>
				<BookmarkDocCard docTitle={row?.docTitle} navigateDoc={goToDocument} savedPages={savedPages}/>
			</Grid>
			<Grid item xs={9}>
				<BookmarksTable bookmarks={row?.bookmarks} deleteBookmark={deleteBookmark} editBookmark={editBookmark} handleDeleted={handleDeleted} isDeleted={isDeleted} isBookmarkDeletionUndo={isUndone}/>
			</Grid>
		</Grid>
		<Snackbar
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			open={isDeleted}
			autoHideDuration={5000}
			message=''
		><Alert severity='success'>Page removed from bookmarks
				{!isUndone && <div onClick={undoDeleteBookmark} style={{cursor: 'pointer', color: 'white', marginTop: '5px'}}>Undo</div>}
			</Alert></Snackbar></>);
};

export default SubBookmarks;
