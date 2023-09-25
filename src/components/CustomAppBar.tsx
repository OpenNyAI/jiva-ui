import {styled} from '@mui/material/styles';
import MuiAppBar, {type AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
const drawerWidth = 300;
type AppBarProps = {
	open?: boolean;
} & MuiAppBarProps;

const CustomAppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...((open === true) && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export default CustomAppBar;
