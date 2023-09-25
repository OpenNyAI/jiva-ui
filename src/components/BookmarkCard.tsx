
import * as React from 'react';
import Button from '@mui/material/Button';
import {type BookmarkCardProps} from '../prop-types/PdfProps';
import {Typography, TextField, Grid, CircularProgress, Popover} from '@mui/material';
import {useEffect} from 'react';
import {CustomContext} from '../utilities/CustomContext';

const BookmarkCard: React.FC<BookmarkCardProps> = ({anchorBookmarkCard, openBookmarkCard, handleBookmarkCardClose, metadata, handleBookmark, bookmarkInformation, removeBookmark, updateBookmark}) => {
	const {updateExistingBookmark} = React.useContext(CustomContext);
	const [bookmarkName, setBookmarkName] = React.useState<string>('');
	const [bookmarkNote, setBookmarkNote] = React.useState<string>('');
	const [isPresent, setIsPresent] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState(false);
	useEffect(() => {
		if (bookmarkInformation?.bookmark_name?.length > 0) {
			setIsPresent(true);
		} else {
			setIsPresent(false);
		}

		setBookmarkName(bookmarkInformation?.bookmark_name);
		setBookmarkNote(bookmarkInformation?.bookmark_note);
	}, [bookmarkInformation, metadata]);
	const handleBookmarkName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBookmarkName(event.target.value);
	};

	const handleBookmarkNote = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBookmarkNote(event.target.value);
	};

	const addBookmark = async () => {
		setLoading(true);
		if (isPresent) {
			await updateBookmark(bookmarkName, bookmarkNote);
			setBookmarkName('');
			setBookmarkNote('');
		} else if (!isPresent && bookmarkName !== undefined) {
			await handleBookmark(bookmarkName, bookmarkNote);
			setBookmarkName('');
			setBookmarkNote('');
		}

		setLoading(false);
	};

	const rmBookmark = async () => {
		setBookmarkName('');
		setBookmarkNote('');
		await removeBookmark(bookmarkInformation);
	};

	const onClose = () => {
		handleBookmarkCardClose();
	};

	return (
		<Popover
			id='simple-popover'
			open={openBookmarkCard}
			anchorEl={anchorBookmarkCard}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			sx={{borderRadius: '7px', marginTop: '10px'}}
		>
			<div style={{padding: '20px', maxWidth: 400}}>
				<Typography sx={{fontSize: 16}} color='text.primary' gutterBottom mb={2}>
				Bookmark this page
				</Typography>
				<Grid container spacing={1}>
					<Grid item xs={3}>
						<Typography variant='body1'>Name</Typography>
						<Typography variant='body1' mt={3}>Note</Typography>
					</Grid>
					<Grid item xs={9}>
						<TextField id='outlined-basic' variant='outlined' size='small' fullWidth value={bookmarkName} onChange={handleBookmarkName}/>
						<TextField id='outlined-basic' variant='outlined' size='small' multiline
							rows={3} fullWidth style={{marginTop: 9}} value={bookmarkNote} onChange={handleBookmarkNote} />
					</Grid>
				</Grid>
				<Typography variant='body2' color='text.secondary' mt={1} mb={3} sx={{fontStyle: 'italic'}} >
					Page {metadata?.pageNo} • {metadata?.metadata?.documentInformation?.title}
				</Typography>
				<Grid container spacing={1}>
					<Grid item xs={3}>
						<Button onClick={rmBookmark} sx={{borderRadius: '8px'}}>Remove</Button>
					</Grid>
					<Grid item xs={9}>
						{loading
							? <Button onClick={addBookmark}><CircularProgress size={20}/></Button>
							: <Button onClick={addBookmark} disabled={bookmarkName?.length === 0 || bookmarkNote?.length === 0 || bookmarkName === undefined || bookmarkNote === undefined}>Save</Button>}

					</Grid>
				</Grid>

			</div>
		</Popover>
	);
};

export default BookmarkCard;
