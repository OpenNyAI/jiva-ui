import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import {type AppHeadeProps} from '../prop-types/MenuProps';
import {useNavigate} from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HamburgerMenu from './HamburgerMenu';
import Header from './Header';
import ClearSearchDialog from './ClearSearchDialog';
import SupportDialog from './SupportDialog';
import {CustomContext} from '../utilities/CustomContext';

const AppHeader: React.FC<AppHeadeProps> = ({openMenu, handleOpenMenu, header}) => {
	const navigate = useNavigate();
	const {accessToken, username} = React.useContext(CustomContext);
	const [anchorHamburger, setAnchorHamburger] = React.useState<undefined | HTMLElement>(undefined);
	const [openClearSearch, setOpenClearSearch] = React.useState(false);
	const [openSupport, setOpenSupport] = React.useState(false);
	const [isClearing, setIsClearing] = React.useState(false);
	const handleOpenClearSearch = () => {
		setOpenClearSearch(true);
	};

	const goToAbout = () => {
		handleCloseHamburgerMenu();
		navigate('/about-jiva');
	};

	const goToActivity = () => {
		handleCloseHamburgerMenu();
		navigate('/activity');
	};

	const handleCloseClearSearch = () => {
		setOpenClearSearch(false);
	};

	const handleOpenSupport = () => {
		setOpenSupport(true);
	};

	const handleCloseSupport = () => {
		setOpenSupport(false);
	};

	const openHamburger = Boolean(anchorHamburger);
	const handleClickHamburgerMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorHamburger(event.currentTarget);
	};

	const handleCloseHamburgerMenu = () => {
		setAnchorHamburger(undefined);
	};

	const handleClearSearch = async () => {
		setIsClearing(true);
		try {
			const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/conversation-history/${username}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const data: unknown = await response.json();
			if ((data as Record<string, unknown>)?.response === 'Conversation is cleared successfully') {
				setIsClearing(false);
				setOpenClearSearch(false);
				handleCloseHamburgerMenu();
				window.location.reload();
			} else {
				setIsClearing(false);
				setOpenClearSearch(true);
			}
		} catch (error) {
			setIsClearing(false);
			setOpenClearSearch(true);
		}
	};

	const subHeaderMenu = (<>
		<IconButton
			size='large'
			aria-label='show 4 new mails'
			color='inherit'
			onClick={handleClickHamburgerMenu}
		>
			<MoreVertIcon />
		</IconButton>
		<HamburgerMenu
			anchorHamburger={anchorHamburger}
			handleCloseHamburgerMenu={handleCloseHamburgerMenu}
			openHamburger={openHamburger}
			openClearSearch={openClearSearch}
			handleCloseClearSearch={handleCloseClearSearch}
			handleOpenClearSearch={handleOpenClearSearch}
			handleOpenSupport={handleOpenSupport}
			navigateAbout={goToAbout}
			navigateActivity={goToActivity}
		/>
		<ClearSearchDialog handleClose={handleCloseClearSearch} open={openClearSearch} handleClearSearch={handleClearSearch} isClearing={isClearing} />
		<SupportDialog handleClose={handleCloseSupport} open={openSupport} /> </>);
	return (
		<Header openMenu={openMenu} handleOpenMenu={handleOpenMenu} headerText={header} subHeaderMenu={subHeaderMenu} />

	);
};

export default AppHeader;
