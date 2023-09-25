import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {Divider, Stack} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));
const BootstrapButton = styled(Button)({
	textTransform: 'lowercase',
});
type SupportDialogProps = {
	handleClose: () => void;
	open: boolean;
};
const SupportDialog: React.FC<SupportDialogProps> = ({handleClose, open}) => (
	<div>
		<BootstrapDialog
			onClose={handleClose}
			aria-labelledby='customized-dialog-title'
			open={open}
		>
			<DialogTitle sx={{m: 0, p: 2}} id='customized-dialog-title'>
            Support
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
				<Typography gutterBottom mb={2.5}>
                We would be happy to answer your question and help you get started with the platform. Please contact us at :
				</Typography>
				<Stack spacing={2} direction='row' mb={1}>

					<BootstrapButton variant='text' href='mailto:support+jiva@opennyai.org' startIcon={<EmailOutlinedIcon/>} sx={{backgroundColor: '#222427', color: '#96AAEB'}}>support+jiva@opennyai.org</BootstrapButton>

				</Stack>
			</DialogContent>
		</BootstrapDialog>
	</div>
);
export default SupportDialog;
