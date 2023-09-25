/* eslint-disable @typescript-eslint/naming-convention */

import React, {} from 'react';
import {Alert, Snackbar} from '@mui/material';
import './AuthenticationFlow.css';
import AuthLayout from '../layout/AuthLayout';
import UpdatePasswordForm from './UpdatePasswordForm';

const UpdatePassword: React.FC = () => {
	const [isUpdated, setIsUpdated] = React.useState(false);
	const urlParams = new URLSearchParams(window.location.search);
	const reset_id = urlParams.get('reset_id');
	const verification_code = urlParams.get('verification_code');
	const handleNotification = (isUpdated: boolean) => {
		setIsUpdated(isUpdated);
	};

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		handleNotification(false);
	};

	const UpdatePasswordComponent = () => (
		<UpdatePasswordForm reset_id={reset_id!} verification_code={verification_code!} handleNotification={handleNotification}/>
	);
	return (
		<>
			<AuthLayout SubComponent={UpdatePasswordComponent}/>
			<Snackbar open={isUpdated} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
				<Alert onClose={handleClose} severity='success' sx={{width: '100%'}}>
			Password Updated Successfully
				</Alert>
			</Snackbar>
		</>
	);
};

export default UpdatePassword;
