/* eslint-disable @typescript-eslint/naming-convention */
import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {type BotDocumentResult} from '../prop-types/BotMessageProps';
import PDFRendererSecond from '../components/PdfRendererSecond';
import Api from '../utilities/Api';
import {useNavigate} from 'react-router-dom';
import {Jurisdiction, type ActMetaData, DocumentFormat, type DocumentMetaData} from '@opennyai/jiva-user-api';
import {CustomContext} from '../utilities/CustomContext';
import {FormControl, IconButton, Select, type SelectChangeEvent} from '@mui/material';
import {pdfjs} from 'react-pdf';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Chatbot.css';
import '../components/PDFRenderer.css';
import {type PdfMetaDataProp} from '../prop-types/PdfProps';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
type PdfProp = {
	pdfMetadata: PdfMetaDataProp;
};
type PdfProps = {
	pdfMetaData: PdfMetaDataProp;
};
const Pdf: React.FC = () => {
	const {username} = useContext(CustomContext);
	const {id, page} = useParams();
	const urlParams = new URLSearchParams(window.location.search);
	const searchTerm = urlParams.get('search');
	const {addRecentDocuments, updatePdfMetadata, accessToken} = React.useContext(CustomContext);
	const navigate = useNavigate();
	const [data, setData] = useState<PdfMetaDataProp>();
	const [section, setSection] = useState<string>('');
	const [pageNumber, setPageNumber] = useState(Number(page));
	const [numPages, setNumPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(Number(page));
	const [actdocInformation, setActdocInformation] = useState<BotDocumentResult>({} as BotDocumentResult);
	const [loading, setLoading] = useState<boolean>(true);
	const [toc, setToc] = useState<unknown>([]);
	const [zoom, setZoom] = useState(0.4);
	const onDocumentLoadSuccess = ({numPages}: {numPages: number}) => {
		setNumPages(numPages);
	};

	const handleZoomIn = (zoomValue: number) => {
		setZoom(prevZoom => Math.min(prevZoom + 0.1, 3));
	};

	const zoomPercentage = Math.round(zoom * 100);
	const handleZoomOut = () => {
		setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.1));
	};

	const getData = async () => {
		updatePdfMetadata({} as PdfMetaDataProp);
		setLoading(true);
		let actInformationBody: ActMetaData = {
			id: '',
			no: '',
			title: '',
			passing_date: '',
			effective_from_date: '',
			jurisdiction: Jurisdiction.CENTER,
			year: '',
		};
		let documentInformationBody: DocumentMetaData = {
			title: '',
			original_file_name: '',
			original_format: DocumentFormat.PDF,
		};
		const documentId = id;
		if (documentId !== undefined && documentId !== '') {
			const documentInformationResponse = await Api.getDocumentInformation(documentId, accessToken);
			const actId = documentInformationResponse?.extra_data?.legal_act_no;
			const actJurisdiction = documentInformationResponse?.extra_data?.legal_act_jurisdiction;
			const actYear = documentInformationResponse?.extra_data?.legal_act_year;
			const actInformationResponse = await Api.getActInformation(`${actJurisdiction!}-${actId!}-${actYear!}`, accessToken);
			if (actInformationResponse !== undefined) {
				actInformationBody = actInformationResponse;
			}

			if (documentInformationResponse !== undefined) {
				documentInformationBody = documentInformationResponse;
			}
		}

		const messageBody: BotDocumentResult = {
			actInformation: actInformationBody,
			documentInformation: documentInformationBody,
		};
		const toc = await getToc();
		if (page !== undefined) {
			setData({
				metadata: messageBody,
				pageNo: Number(page),
				toc,
			});
			setActdocInformation(messageBody);
			setToc(toc);
		}

		if (messageBody?.documentInformation?.id !== undefined) {
			await addRecentDocuments({
				document_id: messageBody?.documentInformation?.id,
				document_title: messageBody?.documentInformation?.title,
				email_id: username,
			});
			updatePdfMetadata({
				metadata: messageBody,
				pageNo: Number(page),
				toc,
			});
		}

		setLoading(false);
	};

	const handlePageChange = (value: string) => {
		setSection(value);
		const selectedValue = value;
		const selectedSection = ((toc as Array<Record<string, unknown>>)?.filter(tocItem => tocItem?.section === selectedValue));
		setPageNumber(Number(selectedSection?.[0]?.startPage));
		setCurrentPage(Number(selectedSection?.[0]?.startPage));
		handlePageNumberInUrl(Number(selectedSection?.[0]?.startPage));
		updatePdfMetadata({
			pageTitle: selectedSection?.[0]?.section as string,
			metadata: actdocInformation,
			pageNo: Number(selectedSection?.[0]?.startPage),
			toc,
		});
	};

	const handlePreviousPage = () => {
		if (pageNumber > 1) {
			const selectedSection = (((toc as Array<Record<string, unknown>>)?.filter(tocItem => tocItem?.startPage === String(pageNumber - 1))));
			setPageNumber(pageNumber - 1);
			setCurrentPage(pageNumber - 1);
			handlePageNumberInUrl(pageNumber - 1);
			updatePdfMetadata({
				pageTitle: selectedSection[0]?.section as string,
				metadata: actdocInformation,
				pageNo: pageNumber - 1,
				toc,
			});
			setSection(selectedSection?.[0]?.section as string);
		}
	};

	const handleNextPage = () => {
		if (pageNumber < numPages) {
			const selectedSection = (((toc as Array<Record<string, unknown>>)?.filter(tocItem => tocItem?.startPage === String(pageNumber + 1))));
			setPageNumber(pageNumber + 1);
			setCurrentPage(pageNumber + 1);
			handlePageNumberInUrl(pageNumber + 1);
			updatePdfMetadata({
				pageTitle: selectedSection[0]?.section as string,
				metadata: actdocInformation,
				pageNo: pageNumber + 1,
				toc,
			});
			setSection(selectedSection?.[0]?.section as string);
		}
	};

	const getToc = async () => {
		const tocs: unknown = await Api.get(`${process.env.REACT_APP_API_ENDPOINT!}/document-section-info/${id!}`, accessToken);
		const tocsFormatted: Array<Record<string, unknown>> = [];
		(tocs as Array<Record<string, unknown>>).map(tocItem => tocsFormatted.push({
			sectionName: tocItem['Full section name'] as string,
			section: (tocItem['Start page'] as string) + (tocItem['Section number'] as string),
			startPage: tocItem['Start page'],
		}));
		return tocsFormatted;
	};

	useEffect(() => {
		getData().catch(error => error as Error);
		setPageNumber(Number(page));
	}, [id]);
	const handlePage = (event: SelectChangeEvent) => {
		handlePageChange(event.target.value);
	};

	const handlePageNumberInUrl = (pageNumber: number) => {
		if (searchTerm !== '' && searchTerm !== null) {
			navigate({
				pathname: `/pdf/${id!}/${pageNumber}`,
				search: `?search=${searchTerm}`,
			});
		} else {
			navigate({
				pathname: `/pdf/${id!}/${pageNumber}`,
			});
		}
	};

	return (<>{data !== undefined && !loading
		? <div>
			<PDFRendererSecond
				zoom={zoom}
				metadata={data?.metadata}
				pageNo={data?.pageNo}
				toc={data?.toc}
				handlePageNumberInUrl={handlePageNumberInUrl}
				handlePageChange={handlePageChange}
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				onDocumentLoadSuccess={onDocumentLoadSuccess} numPages={numPages} pageNumber={pageNumber} section={section} searchinPdf={searchTerm ?? ''}/>
			<div className='pdf-footer'>
				<FormControl sx={{m: 1, minWidth: 100, maxWidth: 350}}>
					<Select native id='grouped-native-select' value={section}
						defaultValue={(toc as Array<Record<string, unknown>>)[0]?.section as string}
						onChange={handlePage}>
						<optgroup label='Table of Contents'>
							{(toc as Array<Record<string, unknown>>).map(tocItem => <option key={tocItem?.section as string} value={tocItem?.section as string }>{tocItem?.sectionName as string}</option>)}
						</optgroup>
					</Select>
				</FormControl>
				<IconButton onClick={handlePreviousPage} style={{borderRadius: '30px', marginRight: '2px'}}>
					<ChevronLeftIcon sx={{color: 'white'}} />
				</IconButton>
				<span>{pageNumber} of {numPages}</span>
				<IconButton onClick={handleNextPage} style={{borderRadius: '30px', marginLeft: '2px'}}>
					<ChevronRightIcon sx={{color: 'white'}}/>
				</IconButton>
				<div style={{backgroundColor: '#222427', borderRadius: '8px'}}>
					<IconButton onClick={() => {
						handleZoomIn(zoom);
					}} style={{borderRadius: '30px', marginRight: '2px'}}>
						<AddIcon style={{color: 'white'}}/>
					</IconButton>
					{zoomPercentage}%
					<IconButton onClick={handleZoomOut} style={{borderRadius: '30px', marginLeft: '2px'}}>
						<RemoveIcon style={{color: 'white'}}/>
					</IconButton>
				</div>
			</div>
		</div>
		: <div style={{backgroundColor: 'red'}}>loading...</div>}</>);
};

export default Pdf;
