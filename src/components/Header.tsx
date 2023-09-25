import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {type HeaderProps} from '../prop-types/MenuProps';
import {Box, CircularProgress} from '@mui/material';
import CustomAppBar from './CustomAppBar';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';
const Header: React.FC<HeaderProps> = ({openMenu, handleOpenMenu, headerText, subHeaderMenu}) => {
	const [anchorHamburger, setAnchorHamburger] = React.useState<undefined | HTMLElement>(undefined);
	const openHamburger = Boolean(anchorHamburger);
	const handleClickHamburgerMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorHamburger(event.currentTarget);
	};

	const handleCloseHamburgerMenu = () => {
		setAnchorHamburger(undefined);
	};

	return (
		<CustomAppBar position='fixed' open={openMenu}>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={handleOpenMenu}
					edge='start'
					sx={{mr: 2, ...(openMenu && {display: 'none'})}}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' component='div'
					style={{
						overflow: 'scroll',
						whiteSpace: 'nowrap',
						maxWidth: '1000px',
						marginTop: '24px',
						marginBottom: '0px',
					}}
					className='scrollable-text'
				>
					{headerText?.length === 0 ? <CircularProgress/> : <>{headerText}</>}
				</Typography>
				<Box sx={{flexGrow: 1, marginLeft: '70px'}} />
				<Box sx={{display: {xs: 'none', md: 'flex'}}}>
					{subHeaderMenu}
				</Box>
			</Toolbar>
		</CustomAppBar>

	);
};

export default Header;
