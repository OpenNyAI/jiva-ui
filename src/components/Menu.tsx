import * as React from 'react';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import './Menu.css';
import {type MenuProps} from '../prop-types/MenuProps';
import DocumentIcon from '../assets/DocumentIcon.png';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {isLinuxPlatform, isMacPlatform, isWindowsPlatform} from '../utilities/PlatformIdentifier';
const drawerWidth = 300;

const SubMenuHeader = styled('div')(({theme}) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	...theme.typography.h6,
}));
const SubMenuTitle = styled('div')(({theme}) => ({
	flex: 1,
	order: 1,
	justifyContent: 'flex-start',
}));
const Menu: React.FC<MenuProps> = ({recentDocuments, handleOpenDocument, handleDrawerClose, openMenu, handleSearchModal, isRoutePdf, userDetails, handleLogOut}) => {
	const navigate = useNavigate();
	const handleClickItem = (link: string) => {
		navigate(link);
	};

	const onClick = (documentId: string) => {
		if (handleOpenDocument !== undefined) {
			handleOpenDocument(documentId ?? '', 1);
		}
	};

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					padding: '10px',
				},
			}}
			className='menu-drawer'
			variant='persistent'
			anchor='left'
			open={openMenu}
		>
			<SubMenuHeader>
				<SubMenuTitle>J I V A _</SubMenuTitle>
				<div style={{justifyContent: 'flex-end', flex: '1', order: '3'}}>
					<IconButton onClick={handleDrawerClose} sx={{float: 'right'}}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
			</SubMenuHeader>
			<List>
				<ListItem key='Search' disablePadding>
					<ListItemButton onClick={() => {
						handleClickItem('/search');
					}}>
						<ListItemIcon>
							<SearchIcon/>
						</ListItemIcon>
						<ListItemText primary='Search' sx={{fontSize: '1rem', fontWeight: '700', color: 'var(--greys-grey-500, #9B9C9E)'}}/>
						{isMacPlatform() || isLinuxPlatform() || isWindowsPlatform()
							? <>{isMacPlatform() ? <ListItemText style={{marginLeft: '14px', color: '#606060'}} primary='⌘+J'/> : <ListItemText style={{marginLeft: '14px', color: '#606060'}} primary='Ctrl+J'/>}</>
							: <ListItemText style={{marginLeft: '14px', color: '#606060'}} primary=''/>}
					</ListItemButton>
				</ListItem>
			</List>
			{recentDocuments && recentDocuments.length > 0
				&& <List>
					<SubMenuHeader><SubMenuTitle>Opened Documents</SubMenuTitle></SubMenuHeader>
					{recentDocuments?.map(recentDocument => (
						<ListItem key={recentDocument?.document_id} sx={{padding: '1px 16px 1px 0px'}}>
							<ListItemButton onClick={() => {
								onClick(recentDocument?.document_id);
							}}>
								<ListItemIcon sx={{minWidth: '30px'}}>
									<InsertDriveFileIcon/>
								</ListItemIcon>
								<ListItemText primary={recentDocument?.document_title}
									style={{
										overflow: 'scroll',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										maxWidth: '230px',
										marginTop: '1rem',
										marginBottom: '0px',
									}} className='scrollable-text'/>
							</ListItemButton>
						</ListItem>
					))}</List>}
			{recentDocuments && recentDocuments.length === 0 && <div style={{textAlign: 'center', padding: '10px', marginTop: '2rem'}}>
				<img src={DocumentIcon} style={{marginBottom: '0.5rem'}}/>
				<Typography variant='body1'>Documents that you open appear here. Use this panel to switch between open documents</Typography>
			</div>}
			<div style={{marginTop: 'auto', padding: '10px 10px 10px 0px'}} className='menu-footer'>
				<Divider/>
				<List>
					<ListItem key='Bookmarks' disablePadding>
						<ListItemButton onClick={() => {
							handleClickItem('/bookmarks');
						}}>
							<ListItemIcon>
								<BookmarkBorderOutlinedIcon sx={{color: 'var(--greys-grey-500, #9B9C9E)'}}/>
							</ListItemIcon>
							<ListItemText primary='Bookmarks' sx={{fontSize: '1rem', fontWeight: '700', color: 'var(--greys-grey-500, #9B9C9E)'}}/>
							<ListItemText style={{marginLeft: '14px', color: '#606060'}} primary=''/>
						</ListItemButton>
					</ListItem>
					<ListItem
						key={userDetails}
						disablePadding
						sx={{padding: '8px 16px 8px 16px', borderRadius: '8px', backgroundColor: 'white'}}
						secondaryAction={
							<IconButton edge='end' aria-label='log-out' onClick={handleLogOut}>
								<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
									<g clipPath='url(#clip0_529_17845)'>
										<path d='M9.99999 18.3327C5.39762 18.3327 1.66666 14.6017 1.66666 9.99935C1.66666 5.39697 5.39762 1.66602 9.99999 1.66602C12.7261 1.66602 15.1464 2.975 16.6668 4.99871L14.4091 4.99877C13.2339 3.96184 11.6904 3.33268 9.99999 3.33268C6.31809 3.33268 3.33332 6.31745 3.33332 9.99935C3.33332 13.6813 6.31809 16.666 9.99999 16.666C11.6908 16.666 13.2347 16.0365 14.4099 14.9992H16.6674C15.1471 17.0233 12.7264 18.3327 9.99999 18.3327ZM15.8333 13.3327V10.8327H9.16666V9.16601H15.8333V6.66601L20 9.99935L15.8333 13.3327Z' fill='#DD6054'/>
									</g>
									<defs>
										<clipPath id='clip0_529_17845'>
											<rect width='20' height='20' fill='white'/>
										</clipPath>
									</defs>
								</svg>
							</IconButton>
						}>
						<ListItemIcon>
							<PermIdentityOutlinedIcon sx={{color: 'black'}}/>
						</ListItemIcon>
						<ListItemText primary={(userDetails?.split('@'))?.[0]} sx={{fontSize: '1rem', fontWeight: '700', color: 'black'}}/>
					</ListItem>
				</List>
			</div>
		</Drawer>
	);
};

export default Menu;
