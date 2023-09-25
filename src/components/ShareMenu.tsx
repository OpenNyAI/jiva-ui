
import {Menu, MenuItem} from '@mui/material';
import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import {type ShareMenuProps} from '../prop-types/PdfProps';

const ShareMenu: React.FC<ShareMenuProps> = ({anchorHamburger, openHamburger, handleCloseHamburgerMenu, handleCopy, copied, onDownloadClick, onPrint}) => (
	<Menu
		id='basic-menu'
		anchorEl={anchorHamburger}
		open={openHamburger}
		onClose={handleCloseHamburgerMenu}
	>
		<MenuItem onClick={handleCopy}><LinkIcon sx={{marginRight: '8px'}}/>Copy link</MenuItem>
		<MenuItem onClick={onDownloadClick}><DownloadIcon sx={{marginRight: '8px'}}/>Download PDF</MenuItem>
		<MenuItem onClick={onPrint}><PrintIcon sx={{marginRight: '8px'}}/>Print</MenuItem>
	</Menu>
);

export default ShareMenu;

