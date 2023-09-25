/* eslint-disable @typescript-eslint/naming-convention */
import React, {type FC, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import Api from '../utilities/Api';
import './AuthenticationFlow.css';
import GridItem from '../components/GridItem';
import AppIntro from '../components/AppIntro';
import JivaLogo from '../components/JivaLogo';
import {type ResetPasswordSuccessFormProps} from '../prop-types/FormProps';
import SuccessMail from '../components/SuccessMail';
import AuthButton from '../components/AuthButton';

type ResetPasswordResponse = {
	detail: string;
};
const ResetPasswordSuccessForm: FC<ResetPasswordSuccessFormProps> = ({
	goToLogin,
	handleNotification,
	emailId,
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleResetPassword = async () => {
		setLoading(true);
		try {
			const userDetails = {
				email_id: emailId,
			};
			const response: unknown = await Api.postWithoutAuthWithQuery(`${process.env.REACT_APP_API_ENDPOINT!}/auth/reset-password`, userDetails);
			if ((response as ResetPasswordResponse)?.detail === 'Incorrect email') {
				setLoading(false);
			} else if ((response as ResetPasswordResponse)?.detail === 'Verification code sent successfully.') {
				setLoading(false);
				handleNotification(true);
			} else {
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<Grid
			container
			direction='column'
			justifyContent='space-around'
			alignItems='center' gap={6}
		>
			<Grid item xs>
				<GridItem/>
			</Grid>
			<Grid item xs>
				<GridItem>
					<AppIntro/>
				</GridItem>
			</Grid>
			<Grid item xs={4}>
				<GridItem style={{textAlign: 'left'}}>
					<SuccessMail/>
				</GridItem>
				<GridItem style={{marginBottom: '120px'}}>
					<Typography variant='h6' mb={0.5} sx={{float: 'left'}}>Check Your Email</Typography>
					<div style={{float: 'left', textAlign: 'initial'}}>Please check the email address {emailId} for instructions to reset your password.</div>
				</GridItem>
				<GridItem>
					<AuthButton
						onClick={handleResetPassword}
						disabled={false}
						loading={loading}
					>Resend Email
					</AuthButton>
					<Typography variant='body2' mt={2} onClick={goToLogin} sx={{cursor: 'pointer', color: '#96AAEB'}}>Back to Login</Typography>
				</GridItem>
			</Grid>
			<Grid item xs>
				<GridItem/>
			</Grid>
			<Grid item xs mt={3}>
				<GridItem><JivaLogo/></GridItem>
			</Grid>
		</Grid>
	);
};

export default ResetPasswordSuccessForm;
