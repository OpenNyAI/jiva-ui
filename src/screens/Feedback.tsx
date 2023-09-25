/* eslint-disable max-depth */
/* eslint-disable @typescript-eslint/naming-convention */
import React, {useContext, useState} from 'react';
import FeedbackButtons from '../components/FeedbackButtons';
import Api from '../utilities/Api';
import {type FeedbackInformation} from '../prop-types/BotMessageProps';
import {CustomContext} from '../utilities/CustomContext';

const postFeedback = async (feedback: Record<string, any>, accessToken: string, username: string, messageId: string) => {
	if (feedback !== undefined) {
		try {
			const updatedMessage
			= {
				email_id: username,
				message_id: messageId,
				feedback: (feedback)?.feedback as boolean,
			};
			const response: unknown = await Api.postWithAuthWithQuery(`${process.env.REACT_APP_API_ENDPOINT!}/query-response-feedback`, feedback, accessToken);
			if (response !== undefined) {
				try {
					const responseConv = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/conversation-history`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${accessToken}`,
						},
						body: JSON.stringify(updatedMessage),
					});

					const data: unknown = await responseConv.json();
					if (data === null) {
						return response;
					}

					return {};
				} catch (error) {}
			}
		} catch (error) {
		}
	}
};

const updateFeedback = async (feedback: Record<string, any>, accessToken: string) => {
	if (feedback !== undefined) {
		try {
			const response: unknown = await Api.postWithAuthWithQuery(`${process.env.REACT_APP_API_ENDPOINT!}/query-response-feedback`, feedback, accessToken);

			return response;
		} catch (error) {
		}
	}
};

const Feedback: React.FC<FeedbackInformation> = ({query, document_title, section_name, section_page_number, messageId, feedbackReceived}) => {
	let liked = false;
	let disliked = true;
	let feedbackMsg = '';
	if (feedbackReceived !== null) {
		if (feedbackReceived) {
			liked = feedbackReceived;
			feedbackMsg = 'Thank you for your feedback!';
		} else if (!feedbackReceived && feedbackReceived !== undefined) {
			disliked = feedbackReceived;
			feedbackMsg = 'Thank you for your feedback! Please give your query in a more clear way.';
		}
	}

	const {username} = useContext(CustomContext);
	const [isLikedResponse, setIsLikedResponse] = useState<boolean>(liked);
	const [isDislikedResponse, setIsDislikedResponse] = useState<boolean>(disliked);
	const [feedbackMessage, setFeedbackMessage] = useState<string>(feedbackMsg);
	const [feedback, setFeedback] = useState<string>('');
	const {accessToken} = useContext(CustomContext);
	const onLiked = async () => {
		setIsLikedResponse(!isLikedResponse);
		if (!isLikedResponse) {
			const body: Record<string, any> = {
				query,
				document_title,
				feedback: true,
				section_name,
				section_page_number,
			};
			const feedbackStatus = postFeedback(body, accessToken, username, messageId);
			if (feedbackStatus !== undefined) {
				setFeedbackMessage('Thank you for your feedback!');
			}
		}
	};

	const onDisLiked = async () => {
		setIsDislikedResponse(!isDislikedResponse);
		if (isDislikedResponse) {
			const body: Record<string, any> = {
				query,
				document_title,
				feedback: false,
				section_name,
				section_page_number,
			};
			const feedbackStatus = postFeedback(body, accessToken, username, messageId);
			if (feedbackStatus !== undefined) {
				setFeedbackMessage('Thank you for your feedback! Please give your query in a more clear way.');
			}
		}
	};

	return (
		<>
			{feedbackMessage === '' ? <FeedbackButtons onLiked={onLiked} onDisLiked={onDisLiked} isLiked={isLikedResponse} isDisliked={isDislikedResponse}/>
				: <div style={{color: '#9B9C9E'}}>{feedbackMessage}</div>}
		</>

	);
};

export default Feedback;

