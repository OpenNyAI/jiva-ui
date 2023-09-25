
import {Menu, MenuItem} from '@mui/material';
import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {type BookmarkEditMenuprops} from '../prop-types/BookmarkProps';
import {CustomContext} from '../utilities/CustomContext';

const BookmarkEditMenu: React.FC<BookmarkEditMenuprops> = ({anchorHamburger, openHamburger, handleCloseHamburgerMenu, editBookmark, deleteBookmark, bookmark}) => {
	const {removeBookmarks} = useContext(CustomContext);
	const navigate = useNavigate();

	return (
		<Menu
			id='basic-menu'
			anchorEl={anchorHamburger}
			open={openHamburger}
			onClose={handleCloseHamburgerMenu}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}

		>
			<MenuItem onClick={
				editBookmark}><EditOutlinedIcon sx={{marginRight: '8px'}}/>Edit</MenuItem>
			<MenuItem onClick={deleteBookmark}><DeleteForeverOutlinedIcon sx={{marginRight: '8px'}}/>Remove</MenuItem>
		</Menu>
	);
};

export default BookmarkEditMenu;

