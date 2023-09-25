import React from 'react';
import {type BotMessageProps} from '../prop-types/BotMessageProps';
import DocumentsSearch from './DocumentsSearch';
import {ResultNotFound, SectionSearchResultIntroduction} from './SearchResultResponses';
import SectionCard from './SectionCard';
import {type SectionQuery, type DocumentQuery, type DocumentListItem} from '../prop-types/ChatBotProps';
import {Grid} from '@mui/material';
import Feedback from '../screens/Feedback';

const BotMessage: React.FC<BotMessageProps> = ({messageId, message, query, handleOpenDocument, feedback}) => (
	<>
		{(message as string)?.length > 0 && <ResultNotFound/>}
		{ ('documentList' in (message as DocumentQuery) && (message as DocumentQuery)?.documentList?.length === 0) && <ResultNotFound/>}
		{(('documentInformation' in (message as DocumentListItem) && (message as DocumentListItem) === undefined && Object.keys(message as DocumentListItem)?.length === 0)
			|| ('sectionList' in (message as SectionQuery) && ((message as SectionQuery)?.sectionList)?.length === 0)
		) && <ResultNotFound/>}
		{'documentInformation' in (message as DocumentListItem) && (message as DocumentListItem) !== undefined && Object.keys(message as DocumentListItem)?.length > 0 && (<>
			<Grid
				container
				direction='row'
				alignItems='center'
				spacing={{xs: 1, sm: 0.2, md: 0.8, lg: 3}} mt={{xs: 2, sm: 2, md: 2, lg: 0}}>
				<Grid item xs>
					<DocumentsSearch documentInformation={(message as DocumentListItem)?.documentInformation} actInformationList={(message as DocumentQuery)?.actInformation} handleOpenDocument={handleOpenDocument} query={query!} messageId={messageId} feedback={feedback}/>
				</Grid>
				<Grid item xs><Feedback query={query} document_title={(message as DocumentListItem)?.documentInformation?.title} section_name='' section_page_number='' messageId={messageId} feedbackReceived={feedback}/></Grid>
			</Grid>
		</>) }
		{'sectionList' in (message as SectionQuery) && (message as SectionQuery)?.sectionList !== undefined && (((message as SectionQuery)?.sectionList)?.length ?? 0) > 0 && <>
			<SectionSearchResultIntroduction/>
			<SectionCard actInformationList={(message as SectionQuery)?.actInformation} sections={(message as SectionQuery)?.sectionList} handleOpenDocument={handleOpenDocument} query={query} messageId={messageId} feedback={feedback}/></>}
	</>
);

export default BotMessage;
