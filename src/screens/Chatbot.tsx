/* eslint-disable no-negated-condition */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import './Chatbot.css';
import Query from '../components/Query';
import AudioInput from '../components/AudioInput';
import {type ChatBotProps, type DocumentQuery, type SectionQuery, type GeneralQuery, type ChatMessageSent, type ChatMessageReceived, type ChatMessageExtended, type DocumentListItem} from '../prop-types/ChatBotProps';
import DocumentAutoComplete from '../components/DocumentAutoComplete';
import {type Document} from '../prop-types/DocumentAutoCompleteProps';
import {type DocumentResponseItem, type SectionResponseItem, type GeneralResponseItem} from '@opennyai/jiva-user-api';
import {userService} from '../utilities/Services';
import {type BotMessageExtendedProps} from '../prop-types/BotMessageProps';
import Loader from '../components/Loader';
import {currentDate} from '../utilities/CurrentDate';
import Introduction from '../components/Introduction';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {Close} from '@mui/icons-material';
import {Snackbar, Alert, IconButton, AlertTitle, CircularProgress, Box, Grid, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BotMessage from '../components/BotMessage';
import Api from '../utilities/Api';
import {CustomContext} from '../utilities/CustomContext';
import {parsingData} from '../utilities/Parsing';
import GridItem from '../components/GridItem';

const getActsInformationForDocQuery = async (responses: DocumentResponseItem[], accessToken: string) => {
	try {
		const responseItems = responses;
		const actInfoPromises = responseItems?.map(
			async (response: DocumentResponseItem) => {
				let key;
				let responseItem;
				let actJurisdiction;
				let actYear;
				let actId;
				if (response?.query_item_type === 'document' && response?.metadata !== undefined) {
					const documentInformation = response;
					actJurisdiction = documentInformation.metadata?.extra_data?.legal_act_jurisdiction;
					actId = documentInformation?.metadata?.extra_data?.legal_act_no;
					actYear = documentInformation?.metadata?.extra_data?.legal_act_year;
					key = documentInformation?.metadata?.id;
					if (actJurisdiction !== undefined && actId !== undefined && actYear !== undefined) {
						responseItem = await Api.getActInformation(`${actJurisdiction}-${actId}-${actYear}`, accessToken);
					}
				}

				return {id: key, response: responseItem?.documents};
			},
		);
		const actInformationResponses = await Promise.all(actInfoPromises);
		return actInformationResponses;
	} catch (error) {
	}
};

const getActsInformationForSectionQuery = async (responses: SectionResponseItem[], accessToken: string) => {
	try {
		const responseItems = responses;
		const actInfoPromises = responseItems?.map(
			async (response: SectionResponseItem) => {
				let key;
				let responseItem;
				let actJurisdiction;
				let actYear;
				let actId;
				if (response?.query_item_type === 'section' && response?.section?.metadata !== undefined) {
					const sectionInformation = response;
					actJurisdiction = sectionInformation?.section?.metadata?.extra_data?.legal_act_jurisdiction;
					actId = sectionInformation?.section?.metadata?.extra_data?.legal_act_no;
					actYear = sectionInformation?.section?.metadata?.extra_data?.legal_act_year;
					const sectionName = sectionInformation?.section?.section_name;
					const id = sectionInformation?.section?.metadata?.id;
					key = `${sectionName}-${id!}`;
					if (actJurisdiction !== undefined && actId !== undefined && actYear !== undefined && key !== undefined) {
						responseItem = await Api.getActInformation(`${actJurisdiction}-${actId}-${actYear}`, accessToken);
					}
				}

				return {id: key, response: responseItem?.documents};
			},
		);
		const actInformationResponses = await Promise.all(actInfoPromises);
		return actInformationResponses;
	} catch (error) {
	}
};

const getGeneralInformationForGeneralQuery = async (responses: GeneralResponseItem[], accessToken: string) => {
	try {
		const responseItems = responses;
		const generalInfoPromises = responseItems?.map(
			async (response: GeneralResponseItem) => {
				let key;
				let result;
				if (response?.query_item_type === 'general' && response?.result !== undefined) {
					result = response.result;
					key = `general-${result}`;
				}

				return {id: key, response: result};
			},
		);
		const generalInformationResponses = await Promise.all(generalInfoPromises);
		return generalInformationResponses;
	} catch (error) {
	}
};

const getMessagesMemory = async (emailId: string, accessToken: string) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/conversation-history/${emailId}`,
			{
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});
		const data: unknown = await response.json();
		const parsedMessages: ChatMessageReceived[] = [];
		(data as ChatMessageSent[])?.forEach(currentMessage => {
			const messageData = parsingData(currentMessage?.message);
			const formattedMessage = {...currentMessage, message: messageData as ChatMessageExtended};
			parsedMessages.push({...currentMessage, message: messageData as ChatMessageExtended});
		});
		return parsedMessages;
	} catch (error) {
		return [];
	}
};

type SuccessfulChatResponse = {
	response: string;
	chat_message_id: string;
};
const setMessagesMemory = async (message: ChatMessageSent, accessToken: string) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/conversation-history`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(message),
		});

		const data: unknown = await response.json();
		return data;
	} catch (error) {
		return {};
	}
};

const Chatbot: React.FC<ChatBotProps> = ({documentList, handleOpenDocument}) => {
	const {username, accessToken, bookmarks, recentDocuments} = React.useContext(CustomContext);
	const todayDate = currentDate();
	const [messages, setMessages] = useState<ChatMessageReceived[]>([]);
	const [input, setInput] = useState<string>('');
	const [selectedDocument, setSelectedDocument] = useState<Document>({title: '', id: ''});
	const [isChatInitiated, setisChatInitiated] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
	const answerContainerRef = useRef<HTMLDivElement>(null);
	const [latestResponse, setLatestResponse] = useState<ChatMessageReceived>({} as ChatMessageReceived);
	const [audioError, setAudioError] = useState<boolean>(false);
	const [apiLoading, setApiLoading] = useState(false);
	const {transcript, listening, resetTranscript} = useSpeechRecognition();
	const handleAudioError = (isError: boolean) => {
		setAudioError(isError);
	};

	const getMessages = async () => {
		if (messages?.length === 0 && !loadingMessages && !apiLoading) {
			setLoadingMessages(true);
			setApiLoading(true);
			const currentMessages: ChatMessageReceived[] = await getMessagesMemory(username, accessToken);
			if (currentMessages?.length > 0) {
				setLoadingMessages(false);
				setMessages(currentMessages);
				setLatestResponse(currentMessages[currentMessages.length - 1]);
			} else {
				setLoadingMessages(false);
				setMessages([]);
				setLatestResponse({} as ChatMessageReceived);
			}
		}
	};

	const handleMessages = async (message: ChatMessageSent) => {
		if (message?.sender === 'user') {
			const messageData = parsingData(message?.message);
			const messageReceived: ChatMessageReceived = {...message, message: messageData as ChatMessageExtended};
			setMessages(prevMessages => [...prevMessages, messageReceived]);
			setLatestResponse(messageReceived);
			setLoading(true);
		}

		try {
			const response: unknown = await setMessagesMemory(message, accessToken);
			if ((response as SuccessfulChatResponse)?.chat_message_id?.length > 0) {
				if (message?.sender === 'bot') {
					const messageData = parsingData(message?.message);
					const messageReceived: ChatMessageReceived = {...message, message: messageData as ChatMessageExtended, message_id: (response as SuccessfulChatResponse)?.chat_message_id};
					setMessages(prevMessages => [...prevMessages, messageReceived]);
					setLatestResponse(messageReceived);
					setLoading(false);
				} else {
					setLoading(false);
				}
			}
		} catch (error) {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!apiLoading && accessToken.length > 0 && username?.length > 0) {
			getMessages().catch(error => error as Error);
		}
	}, []);
	useEffect(() => {
		if (answerContainerRef.current) {
			answerContainerRef.current.scrollIntoView({behavior: 'smooth'});
		}
	}, [latestResponse]);
	const onStartListening = async () => {
		try {
			handleResetTranscript();
			await SpeechRecognition.startListening({continuous: true, language: 'en-IN'});
		} catch (error) {
			handleAudioError(true);
		}
	};

	const onStopListening = async () => {
		try {
			await SpeechRecognition.stopListening();
		} catch (error) {
			handleAudioError(true);
		}
	};

	const handleResetTranscript = () => {
		resetTranscript();
	};

	const handleAudioInput = (transcript: string) => {
		setInput(transcript);
		handleQueryInput(transcript);
		handleDocumentSelection({
			id: '',
			title: transcript,
		});
	};

	const handleQueryInput = (value: string) => {
		setInput(value);
	};

	const handleSubmitFromInput = async (event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
		if (event.key === 'Enter') {
			await handleSubmit();
		}
	};

	const handleDocumentSelection = (document: Document) => {
		setisChatInitiated(true);
		setSelectedDocument(document);
	};

	const getQueryResponse = async (query: string) => {
		try {
			const response = await userService(accessToken).query.query(query);
			return response;
		} catch (error) {
			return {items: []};
		}
	};

	const handleSubmit = async () => {
		if (selectedDocument?.title !== undefined && selectedDocument?.id !== '') {
			const documentId = selectedDocument?.id;
			handleOpenDocument!(documentId!, 1);
		} else if (input !== undefined && input !== '') {
			const messageMemory = messages;
			await handleMessages({
				email_id: username,
				sender: 'user',
				message: input,
				query: input,
				feedback: undefined,
			});
			setInput('');
			setLoading(true);
			const queryResponse = await getQueryResponse(input);
			const queryDocumentResponse = queryResponse?.items.filter(item => item?.query_item_type === 'document');
			const querySectionResponse = queryResponse?.items.filter(item => item?.query_item_type === 'section');
			const generalResponse = queryResponse?.items.filter(item => item?.query_item_type === 'general');
			if (queryDocumentResponse !== undefined && queryDocumentResponse.length > 0) {
				const actInformationResponse = await getActsInformationForDocQuery(queryDocumentResponse as DocumentResponseItem[], accessToken);
				const respQuery = (queryDocumentResponse as DocumentResponseItem[])?.map(async docResp => {
					await handleMessages({
						email_id: username,
						message: JSON.stringify({
							documentInformation: (docResp)?.metadata,
							actInformation: actInformationResponse,
						} as unknown as DocumentListItem),
						sender: 'bot',
						query: input,
						feedback: undefined,
					});
				});
				await Promise.all(respQuery);
			} else if (querySectionResponse !== undefined && querySectionResponse?.length > 0) {
				const actInformationResponse = await getActsInformationForSectionQuery(queryDocumentResponse as SectionResponseItem[], accessToken);
				await handleMessages({
					email_id: username,
					message: JSON.stringify({
						sectionList: querySectionResponse,
						actInformation: actInformationResponse,
					} as unknown as SectionQuery),
					sender: 'bot',
					query: input,
					feedback: undefined,
				});
			} else if (generalResponse !== undefined && generalResponse?.length > 0) {
				const generalInformationResponse = await getGeneralInformationForGeneralQuery(generalResponse as GeneralResponseItem[], accessToken);
				await handleMessages({
					email_id: username,
					message: JSON.stringify({
						result: generalInformationResponse,
					} as unknown as GeneralQuery),
					sender: 'bot',
					query: input,
					feedback: undefined,
				});
			} else {
				await handleMessages({
					email_id: username,
					message: JSON.stringify({
						documentList: [],
						actInformation: [],
					} as unknown as DocumentQuery),
					sender: 'bot',
					query: input,
					feedback: undefined,
				});
			}
		}
	};

	return (
		<div>
			{audioError && <Snackbar open={audioError} autoHideDuration={5000} onClose={() => {
				setAudioError(false);
			}} anchorOrigin={{vertical: 'top', horizontal: 'center'}} sx={{marginTop: '5rem'}}><Alert severity='error'
					action={
						<IconButton
							aria-label='close'
							color='inherit'
							size='small'
							onClick={() => {
								setAudioError(false);
							}}
						>
							<Close fontSize='inherit' />
						</IconButton>
					} sx={{fontSize: '1rem'}}>
					<AlertTitle>Error</AlertTitle>Error happened while recording. Please try again later or you can type your query in the textarea.
				</Alert></Snackbar>}
			<div style={{flex: '1 0 auto', minHeight: '90vh'}}>
				{messages.length === 0 ? (<>
					{ !loading && <>{!loadingMessages ? <Introduction/> : <>{messages?.length > 0 ? <Introduction/> : <Box sx={{flexGrow: 1, marginTop: '4rem'}}>
						<Grid container
							justifyContent='space-around'
							alignItems='center' gap={1}>
							<Grid item xs>
								<GridItem/>
							</Grid>
							<Grid item xs textAlign='center'>
								<GridItem>
									<Grid
										container
										direction='column'
										justifyContent='space-around'
										alignItems='center' gap={6}
									>
										<Grid item xs={4}>
											<GridItem/>
										</Grid>
										<Grid item xs={4}>
											<GridItem/>
										</Grid>
										<Grid item xs={4}>
											<GridItem/>
										</Grid>
										<Grid item xs={4}>
											<GridItem/>
										</Grid>
										<Grid item xs={4}>
											<GridItem>
												<CircularProgress/>
												<Typography variant='h6'>Loading Your Chat History...</Typography>
											</GridItem>
										</Grid>
									</Grid>
								</GridItem>
							</Grid>
							<Grid item xs>
								<GridItem/>
							</Grid>
						</Grid>
					</Box>}</>}</>}
				</>) : (<Grid
					container
					direction='column'
					spacing={2}
					mt={3}
				>
					{messages.map((message, index) => (
						<div ref={answerContainerRef} key={index}>
							{message?.sender === 'user'
								? (<Grid item xs={12} mt={3}><Query query={message?.message as unknown as string ?? ''}/></Grid>)
								: (<Grid item xs={12} ml={2.5}><BotMessage messageId={message?.message_id ?? ''} message={message?.message as BotMessageExtendedProps} query={message?.query} handleOpenDocument={handleOpenDocument} feedback={message?.feedback}/></Grid>
								)
							}
						</div>
					))}
				</Grid>)}
				{loading ? <Loader/> : null}

			</div>
			{!loadingMessages && <div className='chatBotQuery'>
				<DocumentAutoComplete documentList={documentList} inputValue={selectedDocument} handleDocumentSelection={handleDocumentSelection as (document: Document) => void}
					handleSubmitFromInput={handleSubmitFromInput} handleQueryInput={handleQueryInput} queryInput={input}/>
				<AudioInput onStartListening={onStartListening} onStopListening={onStopListening} isListening={listening} onTranscript={handleAudioInput} handleResetTranscript={resetTranscript} transcript={transcript}/>
				<IconButton className='queryButton' type='submit' onClick={handleSubmit} disabled={selectedDocument?.id === '' && input === ''}><SearchIcon sx={{color: 'white'}} fontSize='large'/></IconButton>
			</div>}
		</div>
	);
};

export default Chatbot;
