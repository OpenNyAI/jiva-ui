import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Typography from '@mui/material/Typography';
import ThumbanilIcon from '../assets/Thumbnail.png';
import {type BookmarkDocCardProps} from '../prop-types/BookmarkProps';

const BookmarkDocCard: React.FC<BookmarkDocCardProps> = ({navigateDoc, docTitle, savedPages}) => (
	<Card sx={{maxWidth: 250, marginTop: 3, padding: '3px'}}>
		<CardContent>
			<img
				src={ThumbanilIcon}
			/>
			<Typography gutterBottom variant='body1' component='div' mt={2}>
				{docTitle}
			</Typography>
			<Typography variant='body2' color='text.secondary'>
				{savedPages} saved
			</Typography>
		</CardContent>
		<CardActions>
			<Button size='small' endIcon={<OpenInNewIcon/>} onClick={navigateDoc}>Open Document</Button>
		</CardActions>
	</Card>
);
export default BookmarkDocCard;
