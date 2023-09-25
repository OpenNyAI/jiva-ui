
import {Card, CardContent, Divider, Grid, Typography} from '@mui/material';
import React from 'react';
import {type MetaDataCardProp} from '../prop-types/BotMessageProps';
import './MetaDataCard.css';
import {yearSeperator} from '../utilities/DateIdentifier';
import {MetaDataImage, MetaDataInformation} from './Metadata';
import Feedback from '../screens/Feedback';
const MetaDataCard: React.FC<MetaDataCardProp> = ({metadata, query, handleOpenDocument}) => {
	const messageSeperation = yearSeperator(metadata.documentInformation.title);
	return (
		<Card className='botMessage-metadataCard-card' sx={{borderRadius: '12px'}}>
			<CardContent>
				<Grid container className='botMessage-metadataCard-content'>
					<Grid item xs={1}>
						<img src='/SearchIcon.png' className='botMessage-metadataCard-searchIcon'/>
					</Grid>
					<Grid item xs={9}>
						<Typography variant='h5' component='div' fontWeight='400' fontSize='16px'>
                Here’s a document that I found :
						</Typography>
						<MetaDataInformation metadata={metadata} handleOpenDocument={handleOpenDocument}/>
					</Grid>
					<MetaDataImage metadata={metadata.documentInformation}/>
				</Grid>
			</CardContent>
			<Divider/>
			<CardContent>
				<Grid container className='botMessage-metadataCard-feedback'>
					<Grid item xs={1}>
					</Grid>
					<Grid item xs={2.5}>
						<Typography variant='h5' component='div' fontWeight='400' fontSize='16px' mt={1}>
                    Is this what you were looking for ?
						</Typography>
					</Grid>
					<Feedback query={query} document_title={metadata?.documentInformation?.title} section_name='' section_page_number='' messageId=''/>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default MetaDataCard;
