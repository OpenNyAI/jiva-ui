import * as React from 'react';
import Menu from '@mui/material/Menu';
import {type SearchWordProps} from '../prop-types/PdfProps';
import {TextField, InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchWord: React.FC<SearchWordProps> = ({anchorSearchWord, openSearchWord, handleSearchWordClose, handleSearchWord}) => {
	const [searchTerm, setSearchTerm] = React.useState<string>('');
	const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSearch = (event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSearchWord(searchTerm);
		}
	};

	const onClose = () => {
		handleSearchWordClose();
		setSearchTerm('');
	};

	return (
		<Menu
			id='basic-menu'
			anchorEl={anchorSearchWord}
			open={openSearchWord}
			onClose={onClose}
			sx={{borderRadius: '7px', marginTop: '10px'}}
		>
			<div style={{padding: '3px 8px 3px 8px'}}>
				<TextField id='outlined-basic' InputProps={{
					startAdornment: <InputAdornment position='start'><SearchIcon sx={{color: 'white'}}/></InputAdornment>,
					endAdornment: <InputAdornment position='start'><CloseIcon sx={{color: 'white'}}/></InputAdornment>,
				}} variant='outlined' size='small' fullWidth value={searchTerm} onChange={handleSearchTerm} onKeyDown={handleSearch} placeholder='find in document'/>
			</div>
		</Menu>
	);
};

export default SearchWord;
