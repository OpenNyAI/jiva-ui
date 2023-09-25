/* eslint-disable @typescript-eslint/naming-convention */
import React, {type FC, useState} from 'react';
import {Grid, TextField, Typography} from '@mui/material';
import './AuthenticationFlow.css';
import GridItem from '../components/GridItem';
import AppIntro from '../components/AppIntro';
import Label from '../components/Label';
import JivaLogo from '../components/JivaLogo';
import PasswordField from '../components/PasswordField';
import AuthButton from '../components/AuthButton';
import {type UpdatePasswordFormProps} from '../prop-types/FormProps';
type UpdatePasswordResponse = {
	detail: string;
};
const UpdatePasswordForm: FC<UpdatePasswordFormProps> = ({
	reset_id,
	verification_code,
	handleNotification,
}) => {
	const [failureMsg, setFailureMsg] = useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState<boolean>(false);

	const handlePassword = (newPassword: string) => {
		setFailureMsg('');
		setPassword(newPassword);
		if (newPassword !== confirmPassword) {
			setFailureMsg('Passwords do not match');
		}
	};

	const handlePasswordConfirmation = (newPassword: string) => {
		setFailureMsg('');
		setConfirmPassword(newPassword);
		if (newPassword !== password) {
			setFailureMsg('Passwords do not match');
		}
	};

	const handleUpdatePassword = async () => {
		setLoading(true);
		try {
			const userDetails = {
				reset_id: Number(reset_id),
				verification_code,
				new_password: password,
			};
			const response: Response = await fetch(`${process.env.REACT_APP_API_ENDPOINT!}/auth/update-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userDetails),
			});
			const data: unknown = await response.json();
			if ((data as UpdatePasswordResponse)?.detail === 'Successfully updated password') {
				setLoading(false);
				setFailureMsg('');
				handleNotification(true);
				setPassword('');
				setConfirmPassword('');
			} else {
				setLoading(false);
				setFailureMsg('Please check your details');
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
			alignItems='center' gap={3}
		>
			<Grid item xs>
				<GridItem>
					<AppIntro/>
				</GridItem>
			</Grid>
			<Grid item xs>
				<GridItem>
					<Typography variant='h6' mb={0.5} sx={{float: 'left', textAlign: 'initial'}}>Update Your Password</Typography>
				</GridItem>
			</Grid>
			<Grid item xs={4}>
				<GridItem>
					<Label text='Reset ID'/>
					<TextField id='outlined-read-only-input' placeholder='Enter Reset ID' variant='outlined' fullWidth sx={{marginBottom: '32px'}} InputProps={{
						readOnly: true,
					}} defaultValue={reset_id}/>
					<Label text='Verification Code'/>
					<TextField id='outlined-read-only-input' placeholder='Enter Verification Code' variant='outlined' fullWidth sx={{marginBottom: '32px'}} InputProps={{
						readOnly: true,
					}} defaultValue={verification_code}/>
					<Label text='New Password'/>
					<PasswordField
						password={password}
						handlePassword={handlePassword}
						placeholder='Enter your New Password'/>
					<div style={{marginBottom: '32px'}}/>
					<Label text='Confirm New Password'/>
					<PasswordField
						password={confirmPassword}
						handlePassword={handlePasswordConfirmation}
						placeholder='Confirm your New Password'/>
					<div style={{marginBottom: '15px'}}/>
					<Typography variant='body2' mt={1} mb={2} sx={{float: 'left', color: 'red'}}>{failureMsg}</Typography>
					<div style={{marginTop: '32px'}}/>
					<AuthButton
						onClick={handleUpdatePassword}
						disabled={password?.length === 0 || password === undefined}
						loading={loading}
					>Submit
					</AuthButton>
				</GridItem>
			</Grid>
			<Grid item xs mt={1}>
				<GridItem><JivaLogo/></GridItem>
			</Grid>
		</Grid>
	);
};

export default UpdatePasswordForm;
