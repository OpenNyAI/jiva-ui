import {type DocumentMetaData, type DocumentInfo, type DocumentResponseItem, type SectionResponseItem} from '@opennyai/jiva-user-api';
import {type BotSimpleMessage, type BotDocumentResult} from './BotMessageProps';
import {type QueryProps} from './UserMessageProps';
type ActivityTableProps = {
	activities: DailyActivityItem;
	handleClearSearch: (message_id: string) => Promise<void>;
	handleCloseClearSearch: () => void;
	isClearingActivity: boolean;
	openClearSearch: boolean;
	handleClickClearSearch: () => void;
};
type ActivityColumn = {
	id: 'activity' | 'title' | 'time';
	label: JSX.Element | string;
	minWidth?: number;
	align?: 'right' | 'left';
	format?: (value: string) => JSX.Element | string;
};
type ChatBotProps = {
	documentList: DocumentInfo[] | undefined;
	handleOpenDocument?: (documentId: string, page: number) => void;
};
type DailyActivityList = {
	daily_activities: DailyActivityItem[];
};
type DailyActivityItem = {
	date: string;
	activities: ActivityItem[];
};
type ActivityItem = {
	message_id: string;
	activity: string;
	title: string;
	time: string;
};
type DocumentQuery = {
	documentList: DocumentResponseItem[] | undefined;
	actInformation?: Array<{
		id: string | undefined;
		response: DocumentMetaData[] | undefined;
	}>;
};
type SectionQuery = {
	sectionList: SectionResponseItem[] | undefined;
	actInformation?: Array<{
		id: string | undefined;
		response: DocumentMetaData[] | undefined;
	}>;
};
type DocumentListItem = {
	documentInformation: DocumentMetaData;
	actInformation: Array<{
		id: string | undefined;
		response: DocumentMetaData[] | undefined;
	}> | undefined;
};
type ChatMessageExtended = BotDocumentResult | BotSimpleMessage | QueryProps | DocumentQuery | SectionQuery | string | DocumentListItem;
type ChatMessageReceived = {
	email_id: string;
	message_id?: string;
	message: ChatMessageExtended;
	sender: string;
	query?: string;
	feedback?: boolean;
	message_date?: string;
	message_time?: string;
};
type ChatMessageSent = {
	email_id: string;
	message: string;
	sender: string;
	query?: string;
	feedback?: boolean;
	message_id?: string;
	message_date?: string;
	message_time?: string;
};
type FeedbackButton = {
	isLiked?: boolean;
	isDisliked?: boolean;
	onLiked?: () => Promise<void>;
	onDisLiked?: () => Promise<void>;
};
type AudioProps = {
	onTranscript: (transcript: string) => void;
	transcript: string;
	handleResetTranscript: () => void;
	onStartListening: () => Promise<void>;
	onStopListening: () => Promise<void>;
	isListening: boolean;
};

export type {ActivityColumn, ActivityTableProps, DailyActivityList, DailyActivityItem, ActivityItem, ChatMessageExtended, ChatBotProps, ChatMessageReceived, ChatMessageSent, DocumentQuery, FeedbackButton, AudioProps, SectionQuery, DocumentListItem};
