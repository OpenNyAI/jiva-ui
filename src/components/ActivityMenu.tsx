
import {Menu, MenuItem} from '@mui/material';
import React from 'react';
import {type HamburgerMenuProps} from '../prop-types/MenuProps';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const ActivityMenu: React.FC<HamburgerMenuProps> = ({anchorHamburger, openHamburger, handleCloseHamburgerMenu, handleCloseClearSearch, handleOpenClearSearch, openClearSearch, handleOpenSupport, navigateAbout, navigateActivity}) => (
	<Menu
		id='basic-menu'
		anchorEl={anchorHamburger}
		open={openHamburger}
		onClose={handleCloseHamburgerMenu}
		MenuListProps={{
			'aria-labelledby': 'basic-button',
		}}
	>
		<MenuItem onClick={handleOpenClearSearch} sx={{color: 'red'}}><DeleteForeverOutlinedIcon style={{marginRight: '8px', color: 'red'}}/>Delete All Activity</MenuItem>
	</Menu>
);

export default ActivityMenu;

