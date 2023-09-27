/* eslint-disable no-negated-condition */
/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Chatbot from '../screens/Chatbot';
import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {userService} from '../utilities/Services';
import {type DocumentInfo} from '@opennyai/jiva-user-api';
import {CustomContext} from '../utilities/CustomContext';
import {Routes, Route, useParams} from 'react-router-dom';
import Pdf from '../screens/Pdf';
import Menu from '../components/Menu';
import Bookmarks from '../screens/Bookmarks';
import PdfHeader from '../components/PdfHeader';
import Main from '../components/Main';
import DrawerSpace from '../components/DrawerSpace';
import AppHeader from '../components/AppHeader';
import Bookmark from '../screens/Bookmark';
import AboutJiva from '../screens/AboutJiva';
import Protected from '../utilities/ProtectedRoute';
import Error from '../screens/Error';
import Activity from '../screens/Activity';
import ActivityHeader from '../components/ActivityHeader';
import useKeyPress from '../utilities/useKeyPress';
import {type PdfMetaDataProp} from '../prop-types/PdfProps';
type LayoutProps = {
	isSignedIn: boolean;
};
type LoginResponse = {
	access_token: string;
	refresh_token: string;
	token_type: string;
};
const Layout: React.FC = () => {
	useKeyPress('j', '/search');
	const [openMenu, setOpenMenu] = React.useState(true);
	const [documentList, setDocumentList] = useState<DocumentInfo[]>([]);
	const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
	const location = useLocation();
	const {pathname} = location;
	const {docId} = useParams();
	const isRoutePdf = location.pathname.startsWith('/pdf');
	const navigate = useNavigate();
	const appheaders: Record<string, string>
		= {
			'/search': 'Search on JIVA',
			'/bookmarks': 'Bookmarks',
			'/about-jiva': 'About JIVA',
			'/': 'Not Found',
			'/*': 'Not Found',
			'/activity': 'Your Activity',
		};
	const {accessToken, pdfMetadata, recentDocuments, updatePdfMetadata, username, refreshToken, updateAccessToken, updateRefreshToken, isAuthenticated, handleDeauthentication, updateUsername} = React.useContext(CustomContext);
	const handleOpenMenu = () => {
		setOpenMenu(true);
	};

	const handleMenuClose = () => {
		setOpenMenu(false);
	};

	const handleOpenSearchModal = () => {
		setOpenSearchModal(true);
	};

	const handleCloseSearchModal = () => {
		setOpenSearchModal(false);
	};

	const getDocuments = async () => {
		try {
			const response = await userService(accessToken).documentList.getDocuments();
			setDocumentList(response?.documents);
		} catch (error) {
			setDocumentList([]);
		}
	};

	const handleOpenDocument = async (documentId: string, page: number) => {
		navigate(`/pdf/${documentId}/${page}`);
	};

	const SearchLayout = () => (
		<Chatbot documentList={documentList} handleOpenDocument={handleOpenDocument}/>
	);

	useEffect(() => {
		getDocuments().catch(error => error as Error);
	}, []);
	let accessTokenExpireTime = 0;
	const calculateTimeBeforeExpiration = () => {
		const currentTime = Math.floor(Date.now() / 1000);
		return accessTokenExpireTime - currentTime - 5;
	};

	const refreshAccessToken = async () => {
		const requestBody = {
			email_id: username,
			refresh_token: refreshToken,
		};
		try {
			const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/auth/new-auth-tokens`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			const data: unknown = await response.json();
			return data;
		} catch (error) {
			return {};
		}
	};

	const handleLogOut = () => {
		handleDeauthentication();
		updateAccessToken('');
		updatePdfMetadata({} as PdfMetaDataProp);
		updateRefreshToken('');
		updateUsername('');
		navigate('/login');
	};

	const checkAndRefreshToken = async () => {
		if (isAccessTokenExpired() === true && isAuthenticated) {
			try {
				const newTokenInfo = await refreshAccessToken();
				updateAccessToken((newTokenInfo as LoginResponse)?.access_token);
				updateRefreshToken((newTokenInfo as LoginResponse)?.refresh_token);
			} catch (error) {
			}
		}
	};

	const isAccessTokenExpired = () => {
		if (isAuthenticated && accessToken.length > 0) {
			const basicDecode: string = atob(accessToken?.split('.')[1]);
			const decodedToken: unknown = JSON.parse(basicDecode);
			const currentTime = Math.floor(Date.now() / 1000);
			accessTokenExpireTime = Number((decodedToken as Record<string, unknown>).exp);
			return Number((decodedToken as Record<string, unknown>).exp) < currentTime;
		}
	};

	useEffect(() => {
		const refreshTokenCheckInterval = setInterval(checkAndRefreshToken, calculateTimeBeforeExpiration() * 1000);
		return () => {
			clearInterval(refreshTokenCheckInterval);
		};
	}, []);
	return (
		<Box sx={{display: 'flex'}}>
			<CssBaseline />
			{isRoutePdf
				? <PdfHeader
					openMenu={openMenu}
					handleOpenMenu={handleOpenMenu}
					handleOpenDocument={handleOpenDocument}
					pdfMetaData={pdfMetadata!}/>
				: <>{pathname !== '/activity' ? <AppHeader
					openMenu={openMenu}
					handleOpenMenu={handleOpenMenu}
					header={appheaders[pathname] ?? 'Bookmarks' }/> : <ActivityHeader openMenu={openMenu}
					handleOpenMenu={handleOpenMenu}
					header='Your Activity'/>}</>}
			<Menu
				recentDocuments={recentDocuments}
				handleOpenDocument={handleOpenDocument}
				openMenu={openMenu}
				handleDrawerClose={handleMenuClose}
				handleSearchModal={handleOpenSearchModal}
				isRoutePdf={isRoutePdf}
				userDetails={username}
				handleLogOut={handleLogOut}/>
			<Main open={openMenu} ispdfscreen={isRoutePdf}>
				<DrawerSpace />
				<Routes>
					<Route path='/search' element={<Protected isSignedIn={isAuthenticated}><SearchLayout /></Protected>} />
					<Route path='/pdf/:id/:page' element={<Protected isSignedIn={isAuthenticated}><Pdf/></Protected>} />
					<Route path='/bookmarks' element={<Protected isSignedIn={isAuthenticated}><Bookmarks/></Protected>} />
					<Route path='/bookmark/:docId' element={<Protected isSignedIn={isAuthenticated}><Bookmark/></Protected>} />
					<Route path='/about-jiva' element={<Protected isSignedIn={isAuthenticated}><AboutJiva/></Protected>} />
					<Route path='/activity' element={<Protected isSignedIn={isAuthenticated}><Activity/></Protected>} />
					<Route path='*' element={<Error/>}/>
				</Routes>
			</Main>
		</Box>
	);
};

export default Layout;
