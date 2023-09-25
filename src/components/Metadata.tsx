
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import {Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {type MetaDataCardProps, type MetaDataCardProp, type BotDocumentResult} from '../prop-types/BotMessageProps';
import './MetaDataCard.css';
import {yearSeperator} from '../utilities/DateIdentifier';

const MetaDataInformation: React.FC<MetaDataCardProp> = ({metadata, handleOpenDocument, actInformation}) => {
	const [showViewButton, setShowViewButton] = useState<boolean>(false);
	const [viewButton, setViewButton] = useState<boolean>(false);
	const navigate = useNavigate();
	const messageSeperation = yearSeperator(metadata?.documentInformation?.title);
	const handleClick = (metadata: BotDocumentResult) => {
		if (handleOpenDocument !== undefined) {
			handleOpenDocument(metadata?.documentInformation?.id ?? '', 1);
		}
	};

	return (

		<Grid
			container
			direction='column'
			justifyContent='space-around'
			alignItems='flex-start'
			gap={2}
		>
			<Grid item xs={1}>
				<Typography variant='h6' component='div' fontWeight='700'>
					{metadata?.documentInformation?.title}
				</Typography>
			</Grid>
			<Grid item xs={1}>
				<Typography variant='body1' component='div' fontWeight='400'>
					{metadata?.documentInformation?.extra_data?.legal_act_title}
				</Typography>
			</Grid>
			<Grid item xs={6}>
			</Grid>
		</Grid>

	);
};

const MetaDataImage: React.FC<MetaDataCardProps> = ({metadata}) => (

	<Grid item xs={2}>
		<img src={metadata?.thumbnail_url as string === null ? './Thumbnail.png' : metadata?.thumbnail_url as string} alt={metadata?.title as string} style={{marginTop: 5, width: '115%'}}/>
	</Grid>
);

export {MetaDataInformation, MetaDataImage};
