import {type DocumentMetaData, type ActMetaData, type SectionResponseItem} from '@opennyai/jiva-user-api';
import {type DocumentListItem, type DocumentQuery, type SectionQuery, type GeneralQuery} from './ChatBotProps';

type IntroductionCardProps = {
	heading?: string;
	subheading?: string;
	featureList?: string[];
};
type BotMessageProps = {
	message: BotMessageExtendedProps;
	query?: string;
	messageId: string;
	handleOpenDocument?: (documentId: string, page: number) => void;
	feedback?: boolean | undefined;
};
type SectionQueryProps = {
	sectionInformation: Record<string, unknown>;
};
type BotMessageExtendedProps = BotDocumentResult | BotSimpleMessage | DocumentQuery | SectionQuery | GeneralQuery | string | DocumentListItem;
type BotDocumentResult = {
	actInformation?: ActMetaData;
	documentInformation: DocumentMetaData;
};
type BotSimpleMessage = {
	botMessage: string;
};
type MetaDataCardProps = {
	metadata: DocumentMetaData | undefined;
	handleOpenDocument?: (documentId: string, page: number) => void;
};

type MetaDataCardProp = {
	metadata: BotDocumentResult;
	query?: string;
	handleOpenDocument?: (documentId: string, page: number) => void;
	actInformation?: Array<{
		id: string | undefined;
		response: DocumentMetaData[] | undefined;
	}> | undefined;
};

type DocumentsSearchProps = {
	messageId: string;
	query: string;
	documentInformation: DocumentMetaData | undefined;
	actInformationList: Array<{
		id: string | undefined;
		response: DocumentMetaData[] | undefined;
	}> | undefined;
	handleOpenDocument?: (documentId: string, page: number) => void;
	feedback?: boolean | undefined;
};
type DocumentSearchProps = {
	messageId: string;
	query: string;
	document: DocumentMetaData | undefined;
	handleOpenDocument?: (documentId: string, page: number) => void;
	actInformation: Array<{
		id: string | undefined;
		response: DocumentMetaData[] | undefined;
	}> | undefined;
	feedback?: boolean | undefined;
};
type SectionQueryCardProps = {
	messageId: string;
	sections: SectionResponseItem[] | undefined;
	actInformationList: Array<{
		id: string | undefined;
		response: DocumentMetaData[] | undefined;
	}> | undefined;
	query?: string;
	handleOpenDocument?: (documentId: string, page: number) => void;
	feedback?: boolean | undefined;
};
type ImportantSectionsCardProps = {
	sections: Array<Record<string, any>>;
};
type SectionCardProps = {
	section: Record<string, any>;
};
type UpdatesCardProps = {
	updates: Array<Record<string, any>>;
};
type UpdateProps = {
	update: Record<string, unknown>;
};
type RelatedDocumentsCardProps = {
	relatedDocuments: DocumentMetaData[];
};
type RelatedDocumentProps = {
	relatedDocument: DocumentMetaData;
};
type FeedbackInformation = {
	query?: string;
	document_title?: string;
	section_name?: string;
	section_page_number?: string;
	messageId: string;
	feedbackReceived?: boolean | undefined;
};
export type {DocumentSearchProps, DocumentsSearchProps, IntroductionCardProps, BotSimpleMessage, BotDocumentResult, BotMessageProps, MetaDataCardProps, ImportantSectionsCardProps, SectionCardProps, UpdatesCardProps, UpdateProps,
	RelatedDocumentsCardProps, RelatedDocumentProps, BotMessageExtendedProps, MetaDataCardProp, FeedbackInformation, SectionQueryCardProps};
