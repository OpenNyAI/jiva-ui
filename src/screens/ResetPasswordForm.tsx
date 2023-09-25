/* eslint-disable @typescript-eslint/naming-convention */
import React, {type FC, useState} from 'react';
import {Grid, TextField, Typography} from '@mui/material';
import Api from '../utilities/Api';
import './AuthenticationFlow.css';
import GridItem from '../components/GridItem';
import AppIntro from '../components/AppIntro';
import Label from '../components/Label';
import JivaLogo from '../components/JivaLogo';
import AuthButton from '../components/AuthButton';
import {type ResetPasswordFormProps} from '../prop-types/FormProps';
type ResetPasswordResponse = {
	detail: string;
};
const ResetPasswordForm: FC<ResetPasswordFormProps> = ({goToLogin, goToSuccessPage}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [failureMsg, setFailureMsg] = useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [errorEmail, setErrorEmail] = useState<boolean>(false);

	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFailureMsg('');
		setEmail(event.target.value);
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		setErrorEmail(!emailRegex.test(event.target.value));
	};

	const handleResetPassword = async () => {
		setLoading(true);
		try {
			const userDetails = {
				email_id: email,
			};
			const response: unknown = await Api.postWithoutAuthWithQuery(`${process.env.REACT_APP_API_ENDPOINT!}/auth/reset-password`, userDetails);
			if ((response as ResetPasswordResponse)?.detail === 'Incorrect email') {
				setLoading(false);
				setFailureMsg('Email address not registered. Please contact your admin to create new account.');
			} else if ((response as ResetPasswordResponse)?.detail === 'Verification code sent successfully.') {
				setLoading(false);
				setFailureMsg('');
				goToSuccessPage(email);
			} else {
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			setFailureMsg('Something went wrong. Please try again later.');
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
			<Grid item xs={2}>
				<GridItem>
					<Typography variant='h6' mb={0.5} sx={{float: 'left'}}>Reset Password</Typography>
					<div style={{float: 'left', textAlign: 'initial'}}>Enter your registered email and we’ll send you a link to reset password </div>
				</GridItem>
			</Grid>
			<Grid item xs={4}>
				<GridItem>
					<Label text='Email ID'/>
					<TextField error={errorEmail} id='outlined-basic' placeholder='Enter your email ID' variant='outlined' fullWidth onChange={handleEmail} value={email} helperText={errorEmail ? 'Please enter a valid email' : ''} style={{marginBottom: '32px'}}/>
					<Typography variant='body2' mt={1} mb={5} sx={{float: 'left', color: 'red', textAlign: 'initial'}}>{failureMsg}</Typography>
					<AuthButton
						disabled={email?.length === 0
						|| email === undefined
						|| errorEmail === Boolean(1)}
						onClick={handleResetPassword}
						loading={loading}
					>Send Email</AuthButton>
					<Typography variant='body2' mt={2} onClick={goToLogin} sx={{cursor: 'pointer', color: '#96AAEB'}}>Back to Login</Typography>
				</GridItem>
			</Grid>
			<Grid item xs>
				<GridItem/>
			</Grid>
			<Grid item xs mt={2.5}>
				<GridItem><JivaLogo/></GridItem>
			</Grid>
		</Grid>
	);
};

export default ResetPasswordForm;
