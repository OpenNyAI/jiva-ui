import * as React from 'react';
import {Card, CardContent, Menu, Typography, CardMedia} from '@mui/material';
import {type CardProps, type InformationProps} from '../prop-types/MenuProps';
import './DocumentsSearch.css';
import ThumbnailIcon from '../assets/Thumbnail.png';
import {convertDateInVerbose} from '../utilities/CurrentDate';
const TitleCard: React.FC<CardProps> = ({metadata}) => (
	<Card sx={{display: 'flex', borderRadius: '0.5rem', marginBottom: '1rem', padding: '1px'}}>
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
const EnactmentDateCard: React.FC<CardProps> = ({metadata}) => (
	<Card sx={{textAlign: 'left', borderRadius: '0.5rem', marginBottom: '0.5rem'}}>
		<CardContent>
			<Typography sx={{fontSize: 14}} color='text.secondary'>
          Enactment Date
			</Typography>
			<Typography sx={{fontSize: 14}} mt={1}>
				{convertDateInVerbose(metadata?.documentInformation?.extra_data?.legal_pass_date ?? '') ?? ''}
			</Typography>
		</CardContent>
	</Card>
);

const EnforcementDateCard: React.FC<CardProps> = ({metadata}) => (
	<Card sx={{textAlign: 'left', borderRadius: '0.5rem', marginBottom: '0.5rem'}}>
		<CardContent>
			<Typography sx={{fontSize: 14}} color='text.secondary' gutterBottom>
          Enforcement Date
			</Typography>
			<Typography sx={{fontSize: 14}} mt={1}>
				{convertDateInVerbose(metadata?.documentInformation?.extra_data?.legal_effective_date ?? '') ?? ''}
			</Typography>
		</CardContent>
	</Card>
);
const DepartmentCard: React.FC<CardProps> = ({metadata}) => (
	<Card sx={{textAlign: 'left', borderRadius: '0.5rem', marginBottom: '0.5rem'}}>
		<CardContent>
			<Typography sx={{fontSize: 14}} color='text.secondary' gutterBottom>
          Department
			</Typography>
			<Typography sx={{fontSize: 14}}>
				{metadata?.documentInformation?.extra_data?.legal_ministry}
			</Typography>
		</CardContent>
	</Card>
);
const Information: React.FC<InformationProps> = ({anchorInformation, openInformation, handleCloseInformation, metadata}) => (
	<Menu
		id='basic-menu'
		anchorEl={anchorInformation}
		open={openInformation}
		onClose={handleCloseInformation}
		MenuListProps={{
			'aria-labelledby': 'basic-button',
		}}
	>
		<div style={{borderRadius: '7px', marginBottom: '0px', padding: '10px', maxWidth: 400}}>
			<TitleCard metadata={metadata}/>
			{metadata?.documentInformation?.extra_data?.legal_pass_date !== undefined && metadata?.documentInformation?.extra_data?.legal_pass_date?.length > 0 && <EnactmentDateCard metadata={metadata}/>}
			{metadata?.documentInformation?.extra_data?.legal_effective_date !== undefined && metadata?.documentInformation?.extra_data?.legal_effective_date?.length > 0 && <EnforcementDateCard metadata={metadata}/>}
			{metadata?.documentInformation?.extra_data?.legal_ministry !== undefined && metadata?.documentInformation?.extra_data?.legal_ministry?.length > 0 && <DepartmentCard metadata={metadata}/>}

		</div>
	</Menu>
);
export default Information;
