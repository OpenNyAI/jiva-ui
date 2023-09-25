import {Menu} from '@mui/material';
import React from 'react';
import {type EditionMenuProps} from '../prop-types/MenuProps';
import EditionsList from './EditionsList';

const EditionMenu: React.FC<EditionMenuProps> = ({anchorEdition, openEdition, handleCloseEditionMenu, editions, handleEdition}) => {
	const changeEdition = async (editionId: string) => {
		await handleEdition(editionId);
	};

	return (
		<Menu
			id='basic-menu'
			anchorEl={anchorEdition}
			open={openEdition}
			onClose={handleCloseEditionMenu}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}
			sx={{marginTop: 1}}
		>
			<EditionsList editions={editions} changeEdition={changeEdition}/>

		</Menu>
	);
};

export default EditionMenu;
