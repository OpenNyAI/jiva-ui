import React, {} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Alert, Snackbar} from '@mui/material';
import './AuthenticationFlow.css';
import AuthLayout from '../layout/AuthLayout';
import ResetPasswordSuccessForm from './ResetPasswordSuccessForm';

const ResetPasswordSuccess: React.FC = () => {
	const {emailId} = useParams();
	const navigate = useNavigate();
	const goToLogin = () => {
		navigate('/login');
	};

	const [isMailSent, setIsMailSent] = React.useState(false);
	const handleNotification = (isMailSent: boolean) => {
		setIsMailSent(isMailSent);
	};

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setIsMailSent(false);
	};

	const ResetPasswordSuccessComponent = () => (
		<ResetPasswordSuccessForm
			goToLogin={goToLogin}
			handleNotification={handleNotification}
			emailId={emailId!}/>
	);
	return (
		<>
			<AuthLayout SubComponent={ResetPasswordSuccessComponent}/>
			<Snackbar open={isMailSent} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
				<Alert onClose={handleClose} severity='success' sx={{width: '100%'}}>
		Verification Mail Sent Successfully
				</Alert>
			</Snackbar>
		</>
	);
};

export default ResetPasswordSuccess;
