
import {Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent} from '@mui/material';
import React, {useState} from 'react';
import {type BotDocumentResult, type DocumentSearchProps, type DocumentsSearchProps} from '../prop-types/BotMessageProps';
import './DocumentsSearch.css';
import {MetaDataImage, MetaDataInformation} from './Metadata';
import {type DocumentMetaData} from '@opennyai/jiva-user-api';
import {yearSeperator} from '../utilities/DateIdentifier';
import LinkIcon from './LinkIcon';
type DocsEditionButtonsProps = {
	edition: DocumentMetaData;
	handleClick: (edition: DocumentMetaData) => void;
};
const DocsEditionButtons: React.FC<DocsEditionButtonsProps> = ({edition, handleClick}) => {
	const [viewButton, setViewButton] = useState<boolean>(false);
	const editionYear = edition?.publish_date?.substring(0, 4)?.trim();
	return (
		<Grid item xs={3} key={edition?.id} alignContent='center'>
			{viewButton
				? <div
					key={edition?.id}
					style={{color: 'white', backgroundColor: '#5571C2', marginTop: '1.5rem', borderRadius: '0.5rem', textAlign: 'center', padding: '5px', cursor: 'pointer'}}
					onClick={() => {
						handleClick(edition);
					}} onMouseLeave={() => {
						setViewButton(false);
					}}>
		Edition {editionYear} <LinkIcon color='white'/>
				</div>
				: <div key={edition?.id} style={{color: 'white', marginTop: '1.5rem', padding: '5px'}} onMouseEnter={() => {
					setViewButton(true);
				}}>
Edition {editionYear}
				</div>}</Grid>);
};

const DocumentSearch: React.FC<DocumentSearchProps> = ({document, handleOpenDocument, query, actInformation, messageId, feedback}) => {
	const [viewButton, setViewButton] = useState<boolean>(false);
	let messageSeperation;
	if (document?.title !== undefined) {
		messageSeperation = yearSeperator(document?.title);
	}

	const [editionSelection, setEditionSelection] = useState<string>('');
	const handleChangeEdition = (event: SelectChangeEvent) => {
		setEditionSelection(event.target.value);
		handleOpenDocument!(event.target.value ?? '', 1);
	};

	const handleClick = (edition: DocumentMetaData) => {
		if (handleOpenDocument !== undefined) {
			const metadata: BotDocumentResult = {
				documentInformation: edition,
			};
			handleOpenDocument(metadata?.documentInformation?.id ?? '', 1);
		}
	};

	let editionsLength;
	let adjustedLength;
	let selectLabel;
	if (actInformation![0]?.response?.length !== undefined) {
		editionsLength = actInformation![0]?.response?.length;
		adjustedLength = editionsLength - 3;
		selectLabel = '+' + String(adjustedLength) + ' more';
	}

	const metadataInformation = {
		documentInformation: document!,
	};
	return (
		<Card className='documentSearchCard-card' sx={{borderRadius: '0.75rem'}} key={document?.id}>
			<CardContent sx={{padding: '1rem 1rem 1rem 0'}}>
				<Grid container className='documentSearchCard-content' spacing ={2}>
					<Grid item xs={10}>
						<MetaDataInformation metadata={metadataInformation} handleOpenDocument={handleOpenDocument} actInformation={actInformation}/>
						<Grid container spacing={1}>

							{actInformation![0]?.response?.slice(0, 3).map(edition => (
								<DocsEditionButtons key={edition?.id} edition={edition} handleClick={handleClick}/>))}
							{adjustedLength !== undefined && adjustedLength > 0 && <Grid item xs={3}>
								<FormControl variant='standard' sx={{minWidth: 120}}>
									<InputLabel id='demo-simple-select-standard-label'>{selectLabel}</InputLabel>
									<Select
										fullWidth
										labelId='demo-simple-select-standard-label'
										id='demo-simple-select-standard'
										label= {selectLabel}
										placeholder={selectLabel}
										value={editionSelection}
										onChange={handleChangeEdition}
									>
										{actInformation![0]?.response?.slice(3).map(edition => <MenuItem value={edition?.id} key={edition?.id}>Edition {edition?.publish_date?.substring(0, 4)?.trim()}</MenuItem>)}

									</Select>
								</FormControl></Grid>}
						</Grid>
					</Grid>
					<MetaDataImage metadata={document}/>
				</Grid>
			</CardContent>
		</Card>
	);
};

const DocumentsSearch: React.FC<DocumentsSearchProps> = ({documentInformation, actInformationList, handleOpenDocument, query, messageId, feedback}) => {
	const [searchFullView, setSearchFullView] = useState(false);
	const handleView = () => {
		setSearchFullView(!searchFullView);
	};

	let actInfo: Array<{
		id: string | undefined;
		response: DocumentMetaData[] | undefined;
	}> = [];
	if (actInformationList !== undefined && actInformationList?.length > 0) {
		actInfo = actInformationList?.filter(act => act?.id === documentInformation?.id);
	}

	return (
		<>
			<DocumentSearch query={query} document={documentInformation} handleOpenDocument={handleOpenDocument} actInformation={actInfo} messageId={messageId} feedback={feedback}/>
		</>

	);
};

export default DocumentsSearch;
