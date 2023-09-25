import {type DocumentMetaData} from '@opennyai/jiva-user-api';
import {type BotDocumentResult} from './BotMessageProps';
import {type ReactNode} from 'react';
import {type PdfMetaDataProp} from './PdfProps';
import {type RecentDocument} from './RecentDocumentProps';

type MenuLayoutProps = {
	recentDocuments?: PdfMetaDataProp[];
	handleOpenDocument?: (documentId: string, page: number) => void;
};
type MenuProps = {
	handleSearchModal?: () => void;
	recentDocuments?: RecentDocument[];
	handleOpenDocument?: (documentId: string, page: number) => void;
	openMenu?: boolean;
	handleDrawerClose?: () => void;
	isRoutePdf?: boolean;
	userDetails?: string;
	handleLogOut?: () => void;
};
type HeaderProps = {
	openMenu: boolean;
	handleOpenMenu: () => void;
	handleOpenDocument?: (documentId: string, page: number) => void;
	headerText?: string;
	subHeaderMenu?: ReactNode;
};
type PdfHeaderProps = HeaderProps & {
	pdfMetaData: PdfMetaDataProp;
};
type AppHeadeProps = HeaderProps & {
	header: string;
};
type InformationProps = {
	anchorInformation: undefined | HTMLElement;
	openInformation: boolean;
	handleCloseInformation: () => void;
	metadata?: BotDocumentResult;
};
type CardProps = {
	metadata?: BotDocumentResult;
};
type HamburgerMenuProps = {
	anchorHamburger: undefined | HTMLElement;
	openHamburger: boolean;
	handleCloseHamburgerMenu: () => void;
	handleCloseClearSearch?: () => void;
	handleOpenClearSearch?: () => void;
	openClearSearch?: boolean;
	handleOpenSupport?: () => void;
	navigateAbout?: () => void;
	navigateActivity?: () => void;
};
type EditionMenuProps = {
	anchorEdition: undefined | HTMLElement;
	openEdition: boolean;
	handleCloseEditionMenu: () => void;
	editions: DocumentMetaData[] | undefined;
	handleEdition: (documentId: string) => Promise<void>;
};

export type {CardProps, InformationProps, MenuProps, MenuLayoutProps, HeaderProps, HamburgerMenuProps, EditionMenuProps, PdfHeaderProps, AppHeadeProps};
