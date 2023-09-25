import {type DocumentInfo} from '@opennyai/jiva-user-api';

type DocumentAutoCompleteProps = {
	documentList: DocumentInfo[] | undefined;
	inputValue?: Document;
	queryInput?: string;
	handleQueryInput?: (value: string) => void;
	handleDocumentSelection?: (document: Document) => void;
	handleSubmitFromInput?: (event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => Promise<void>;

};
type Document = {
	title?: string;
	id?: string;
};

export type {DocumentAutoCompleteProps, Document};
