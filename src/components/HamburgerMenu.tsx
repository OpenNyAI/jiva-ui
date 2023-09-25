
import {Menu, MenuItem} from '@mui/material';
import React from 'react';
import {type HamburgerMenuProps} from '../prop-types/MenuProps';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({anchorHamburger, openHamburger, handleCloseHamburgerMenu, handleCloseClearSearch, handleOpenClearSearch, openClearSearch, handleOpenSupport, navigateAbout, navigateActivity}) => (
	<Menu
		id='basic-menu'
		anchorEl={anchorHamburger}
		open={openHamburger}
		onClose={handleCloseHamburgerMenu}
		MenuListProps={{
			'aria-labelledby': 'basic-button',
		}}
	>
		<MenuItem onClick={handleOpenClearSearch}><img src='./Clear-Search-1.svg' style={{marginRight: '8px', color: 'white'}}/>Clear Search</MenuItem>
		<MenuItem onClick={() => {
			window.location.reload();
		}}><RefreshIcon sx={{marginRight: '8px'}}/>Refresh</MenuItem>
		<MenuItem onClick={navigateActivity}><HistoryOutlinedIcon sx={{marginRight: '8px'}}/>Your Activity</MenuItem>
		<MenuItem onClick={navigateAbout}><InfoOutlinedIcon sx={{marginRight: '8px'}}/>About JIVA</MenuItem>
		<MenuItem onClick={handleOpenSupport}><HelpOutlineIcon sx={{marginRight: '8px'}}/>Support</MenuItem>
	</Menu>
);

export default HamburgerMenu;

