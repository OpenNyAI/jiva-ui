import * as React from 'react';
import Divider from '@mui/material/Divider';
import {Card, CardContent, Menu, Typography, CardMedia, CardHeader} from '@mui/material';
import {type CardProps} from '../prop-types/MenuProps';
import './DocumentsSearch.css';
import ThumbnailIcon from '../assets/Thumbnail.png';
import {type NotificationProps} from '../prop-types/PdfProps';
import NotificationsIcon from '../assets/Notifications.svg';
const TitleCard: React.FC<CardProps> = ({metadata}) => (
	<Card sx={{display: 'flex', borderRadius: '0.5rem', marginBottom: '1rem', padding: '1px'}}>
		<CardHeader>cewkideow</CardHeader>
		<CardMedia
			component='img'
			sx={{width: 90, objectFit: 'cover', padding: '7px'}}
			image={metadata?.documentInformation?.thumbnail_url === null ? ThumbnailIcon : metadata?.documentInformation?.thumbnail_url}
			alt='Card Image'
		/>
		<CardContent sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
			<Typography variant='body1' sx={{flex: 2, wordWrap: 'break-word', justifyContent: 'flex-start', order: 1}}>
				{metadata?.documentInformation?.title}
			</Typography>
			<Typography variant='body1' sx={{flex: 1, justifyContent: 'flex-start', order: 3}}>
				Edition {metadata?.documentInformation?.publish_date?.substring(0, 4).trim()}
			</Typography>
		</CardContent>
	</Card>
);

const Notification: React.FC<NotificationProps> = ({anchorNotification, openNotification, handleCloseNotification, metadata}) => (
	<Menu
		id='basic-menu'
		anchorEl={anchorNotification}
		open={openNotification}
		onClose={handleCloseNotification}
		MenuListProps={{
			'aria-labelledby': 'basic-button',
		}}
	>
		<div style={{borderRadius: '8px', marginBottom: '0px', maxWidth: 400, minWidth: 300}}>
			<Typography variant='body1' p={1.5}>Recent Notifications</Typography>
			<Divider/>
			<div style={{display: 'flex', padding: 30}}>
				<div style={{flex: 1, justifyContent: 'flex-start'}}></div>
				<div style={{flex: 3, justifyContent: 'space-around', textAlign: 'center', paddingBottom: 30}}><img src={NotificationsIcon}/><Typography variant='body2'>There are currently no updates to this document.</Typography></div>
				<div style={{flex: 1, justifyContent: 'flex-end'}}></div>
			</div>
		</div>
	</Menu>
);
export default Notification;
