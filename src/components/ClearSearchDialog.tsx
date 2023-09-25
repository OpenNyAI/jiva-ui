/* eslint-disable no-negated-condition */
import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {CircularProgress, Divider} from '@mui/material';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));
type ClearSearchDialogProps = {
	handleClose: () => void;
	open: boolean;
	handleClearSearch: () => void;
	isClearing: boolean;
};
const ClearSearchDialog: React.FC<ClearSearchDialogProps> = ({handleClose, open, handleClearSearch, isClearing}) => (
	<div>
		<BootstrapDialog
			onClose={handleClose}
			aria-labelledby='customized-dialog-title'
			open={open}
		>
			<DialogTitle sx={{m: 0, p: 2}} id='customized-dialog-title'>
            Clear Search
			</DialogTitle>
			<IconButton
				aria-label='close'
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: 'white',
				}}
			>
				<CloseIcon />
			</IconButton>
			<Divider/>
			<DialogContent>
				<Typography gutterBottom>
                Clearing this chat will remove all existing queries and responses. You can start a fresh query.
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button autoFocus variant='outlined' onClick={handleClose} sx={{color: '#96AAEB'}}>
                Cancel
				</Button>
				{isClearing ? <Button autoFocus variant='outlined' onClick={handleClearSearch} sx={{color: '#96AAEB'}}><CircularProgress sx={{color: 'white'}} size={23}/>
				</Button> : <Button autoFocus variant='outlined' onClick={handleClearSearch} sx={{color: '#96AAEB'}}>
                Confirm
				</Button>}
			</DialogActions>
		</BootstrapDialog>
	</div>
);
export default ClearSearchDialog;
