/* eslint-disable @typescript-eslint/strict-boolean-expressions */

/* eslint-disable @typescript-eslint/naming-convention */
import React, {useCallback, useRef, useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {useNavigate} from 'react-router-dom';
import './PDFRenderer.css';
import {type SelectChangeEvent} from '@mui/material';
import {saveAs} from 'file-saver';
import {type BotDocumentResult} from '../prop-types/BotMessageProps';
import {type DocumentMetaData} from '@opennyai/jiva-user-api';
import {type PdfRendererProps} from '../prop-types/PdfProps';
import {type CustomTextRenderer} from 'react-pdf/dist/cjs/shared/types';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type URLDictItem = {
	quiredDoc: string;
	name: string;
};

type SearchResult = {
	page: number;
	matches: RegExpMatchArray;
};

type PDFRendererProps = {
	metadata: BotDocumentResult;
	page: number;
};
function highlightPattern(text: string, pattern: string, countRef: React.MutableRefObject<number>): string {
	const regex = new RegExp(pattern, 'gi');
	return text.replace(regex, value => {
		countRef.current += 1;
		return `<mark>${value}</mark>`;
	});
}

const PDFRendererSecond: React.FC<PdfRendererProps> = ({metadata, pageNo, toc, handlePageNumberInUrl, handlePageChange, handlePreviousPage, handleNextPage, onDocumentLoadSuccess, numPages, pageNumber, section, searchinPdf, zoom}) => {
	const [quiredDoc, setQuiredDoc] = useState(metadata.documentInformation);
	const documents = metadata.actInformation?.documents?.filter(doc => doc?.extra_data?.legal_doc_type === 'act');
	const navigate = useNavigate();

	const [url, setUrl] = useState(quiredDoc.public_url);
	const [name, setName] = useState(quiredDoc.title);
	const [publishDate, setPublishDate] = useState(quiredDoc.publish_date);
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [showSecondCard, setShowSecondCard] = useState(false);
	const highlightCountRef = useRef(0);
	const customTextRenderer: CustomTextRenderer = useCallback(
		props => highlightPattern(props.str, searchinPdf!, highlightCountRef),
		[searchinPdf],
	);

	const handlePage = (event: SelectChangeEvent) => {
		handlePageChange(event.target.value);
	};

	const handleToggleSecondCard = () => {
		setShowSecondCard(!showSecondCard);
	};

	const handleClickVersion = (document: DocumentMetaData) => {
		setQuiredDoc(document);
		setUrl(document.public_url);
		setName(document.title);
		setPublishDate(document.publish_date);
	};

	const onDownloadClick = () => {
		saveAs(url!, name);
	};

	if (!url) {
		return null;
	}

	return (<>
		<div className='rendering-document-area'>
			<Document file={{url}} onLoadSuccess={onDocumentLoadSuccess}
				externalLinkTarget='_blank'
			>
				<Page
					pageNumber={pageNumber}
					customTextRenderer={customTextRenderer}
					scale={zoom} width={window.innerWidth - (zoom! * 100)}
				/>
			</Document>

		</div>
	</>
	);
};

export default PDFRendererSecond;
