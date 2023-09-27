/* eslint-disable @typescript-eslint/naming-convention */
import {Button, Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, {useContext, useEffect, useState} from 'react';
import {type BotDocumentResult, type SectionQueryCardProps} from '../prop-types/BotMessageProps';
import './SectionCard.css';
import {yearSeperator} from '../utilities/DateIdentifier';
import Feedback from '../screens/Feedback';
import {type SectionResponseItem} from '@opennyai/jiva-user-api';
import {CustomContext} from '../utilities/CustomContext';
import LinkIcon from './LinkIcon';

type SectionEdition = {
	editionYear: string;
	edition: SectionResponseItem;
};
const SectionCard: React.FC<SectionQueryCardProps> = ({sections, actInformationList, query, handleOpenDocument, messageId, feedback}) => {
	const sectionsEditions: SectionEdition[] = [];
	sections?.forEach(section => {
		const obj = {
			editionYear: (section?.section?.metadata?.publish_date?.substring(0, 4).trim() ?? ''),
			edition: section,
		};
		sectionsEditions.push(obj);
	});
	const {accessToken} = useContext(CustomContext);
	const sectionsYearSorted = sectionsEditions?.sort((a, b) => Number(b?.editionYear) - Number(a?.editionYear));
	const navigate = useNavigate();
	const [sectionImages, setSectionImages] = useState<Record<string, any>>({});
	const [expanded, setExpanded] = useState<boolean>(false);

	const handleLoadMore = () => {
		setExpanded(true);
	};

	const handleClick = (section: SectionResponseItem) => {
		const metadata: BotDocumentResult = {
			documentInformation: section.section.metadata,
		};
		handleOpenDocument!(metadata?.documentInformation?.id ?? '', section?.section?.start_page);
	};

	const getSectionImg = async (data: Array<Record<string, unknown>>) => {
		try {
			const responseArray = await Promise.all(
				data.map(
					async section => {
						const response: Response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/document/${section?.document_id as string}?page_number=${section?.section_page_number as string}`, {
							method: 'GET',
							headers: {
								accept: 'application/json',
								Authorization: `Bearer ${accessToken}`,
							},
						});
						return {id: section?.document_id, response};
					}));

			const imagesPromises: Array<Promise<{id: unknown; response: string}>> = responseArray.map(
				async response => {
					const blob: Blob = await (response?.response as unknown as Response).blob();
					const reader = new FileReader();
					const promise = new Promise<string>(resolve => {
						reader.onloadend = () => {
							const {result} = reader;
							if (typeof result === 'string') {
								resolve(result);
							}
						};
					});
					reader.readAsDataURL(blob);
					const image = await promise;
					return {id: response?.id, response: image};
				},
			);

			const imageContents: Array<Record<string, any>> = await Promise.all(imagesPromises);
			const imageMap: Record<string, any> = {};
			imageContents.forEach(async imageContent => {
				const {id, response} = imageContent;
				imageMap[id as string] = await response as string;
			});
			setSectionImages(imageMap);
		} catch (error) {
			setSectionImages([]);
		}
	};

	useEffect(() => {
		const data: Array<Record<string, unknown>> = [];
		sections?.map(section => data.push({
			document_id: section?.section?.metadata?.id,
			section_page_number: String(section?.section?.start_page),
		}));
		getSectionImg(data).catch(error => error as Error);
	}, [sections]);
	let editionsLength;
	let adjustedLength: number;
	let selectLabel: string;
	if (sectionsYearSorted?.length !== undefined) {
		editionsLength = sectionsYearSorted?.length;
		adjustedLength = editionsLength - 3;
		selectLabel = '+' + String(adjustedLength) + ' more';
	}

	const [editionSelection, setEditionSelection] = useState<string>('');
	const handleChangeEdition = (event: SelectChangeEvent) => {
		setEditionSelection(event.target.value);
		const sectionPage = (sectionsYearSorted.find(section => section?.edition?.section?.metadata?.id === event.target.value))?.edition?.section?.start_page;
		handleOpenDocument!(event.target.value ?? '', sectionPage!);
	};

	return (<>
		{sectionsYearSorted?.slice(0, 1)?.map((section, index) => {
			const messageSeperation = yearSeperator(section?.edition?.section?.metadata?.title);
			return (
				<Grid
					container
					direction='row'
					alignItems='center'
					spacing={{xs: 1, sm: 0.2, md: 0.8, lg: 3}} mt={{xs: 2, sm: 2, md: 2, lg: 0}} key={section?.edition?.query_item_type}>
					<Grid item xs>
						<Card className='section-section-card' sx={{borderRadius: '0.75rem'}} >
							<CardContent className='section-card-content' sx={{padding: '2rem'}}>
								<Typography variant='h5' component='div' fontWeight='400' fontSize='16px'>
                Found inside <b>{section?.edition?.section?.metadata?.title}, Section {section?.edition?.section?.section_name}, Page {section?.edition?.section?.start_page}</b>
								</Typography>
								<div className={`image-container-section${expanded ? '-expanded' : ''}`}>
									<img className='section-image' src={sectionImages[section?.edition?.section?.metadata?.id ?? ''] as string} style={{marginTop: '25px', marginBottom: '20px'}}/>
									{!expanded && (
										<Button
											variant='contained'
											color='primary'
											className='section-load-more-button'
											onClick={handleLoadMore}
											sx={{position: 'absolute', borderRadius: '1.3rem', backgroundColor: '#5571C2', color: 'white'}}
											endIcon={<ArrowDownwardIcon />}
										>
										Read More
										</Button>
									)}
								</div>
								<Grid container spacing={1}>
									<Grid item xs={3} alignContent='center'>
										<div style={{color: '#96AAEB',
											borderRadius: '0.5rem',
											border: '1px solid #96AAEB',
											textAlign: 'center', padding: '5px', cursor: 'pointer', marginTop: '1.5rem', marginRight: 25}}
										onClick={() => {
											handleClick(section?.edition);
										}}>
                            Edition {messageSeperation?.yearExpression}
											<LinkIcon color='#96AAEB' style={{marginLeft: 4}}/>
										</div>
									</Grid>
									{sectionsYearSorted?.slice(1, 3)?.map(sectionYear => <Grid item key={sectionYear?.editionYear} xs={2.5} alignContent='center'><div style={{color: 'white', marginTop: '1.7rem', cursor: 'pointer'}} onClick={() => {
										handleClick(sectionYear?.edition);
									}}>Edition {sectionYear?.editionYear}</div></Grid>)}
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
												{sectionsYearSorted?.slice(3)?.map(edition => <MenuItem value={edition?.edition?.section?.metadata?.id} key={edition?.editionYear}>Edition {edition?.editionYear}</MenuItem>)}

											</Select>
										</FormControl></Grid>}
								</Grid>
							</CardContent>
							<Divider/>
						</Card>
					</Grid>
					<Grid item xs><Feedback query={query} document_title={section?.edition?.section?.metadata?.title} section_name={section?.edition?.section?.section_name} section_page_number={String(section?.edition?.section?.start_page)} messageId={messageId} feedbackReceived={feedback}/></Grid>
				</Grid>
			);
		})}</>

	);
};

export default SectionCard;
