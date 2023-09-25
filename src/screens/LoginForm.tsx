import React, {type FC, useState} from 'react';
import {Grid, TextField, Typography} from '@mui/material';
import Api from '../utilities/Api';
import './AuthenticationFlow.css';
import GridItem from '../components/GridItem';
import AppIntro from '../components/AppIntro';
import Label from '../components/Label';
import PasswordField from '../components/PasswordField';
import {type LoginFormProps} from '../prop-types/FormProps';
import './LoginForm.css';
import AuthButton from '../components/AuthButton';
import JivaLogo from '../components/JivaLogo';
type LoginResponse = {
	access_token: string;
	refresh_token: string;
	token_type: string;
};

const LoginForm: FC<LoginFormProps> = ({
	goToResetPassword,
	handleAuthentication,
	updateAccessToken,
	updateRefreshToken,
	updateUsername,
	goToSearch,
}) => {
	const [email, setEmail] = React.useState<string>('');
	const [errorEmail, setErrorEmail] = useState<boolean>(false);
	const [password, setPassword] = React.useState<string>('');
	const [failureMsg, setFailureMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const handleFailureMsg = (msg: string) => {
		setFailureMsg(msg);
	};

	const handleLoading = (loadingState: boolean) => {
		setLoading(loadingState);
	};

	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleFailureMsg('');
		setEmail(event.target.value);
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		setErrorEmail(!emailRegex.test(event.target.value));
	};

	const handlePassword = (newPassword: string) => {
		handleFailureMsg('');
		setPassword(newPassword);
	};

	const handleLogin = async () => {
		handleFailureMsg('');
		handleLoading(true);
		try {
			const userDetails = `grant_type=password&username=${email}&password=${password}`;
			const response: unknown = await Api.postWithoutAuthWithBody(`${process.env.REACT_APP_API_ENDPOINT!}/auth/login`, userDetails);
			if ('detail' in (response as Record<string, unknown>)) {
				handleLoading(false);
				handleFailureMsg('Incorrect email or password');
			} else {
				handleAuthentication();
				updateAccessToken((response as LoginResponse)?.access_token);
				updateRefreshToken(((response as LoginResponse)?.refresh_token));
				updateUsername(email);
				goToSearch();
				handleLoading(false);
			}
		} catch (error) {
			handleLoading(false);
			handleFailureMsg('Incorrect email or password');
		}
	};

	return (
		<Grid
			container
			direction='column'
			justifyContent='space-around'
			alignItems='center'
			gap={6}
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
				<GridItem>
					<Label text='Email ID'/>
					<TextField error={errorEmail} id='outlined-basic' placeholder='Enter your email ID' variant='outlined' fullWidth sx={{marginBottom: '32px'}} onChange={handleEmail} value={email} helperText={errorEmail ? 'Please enter a valid email' : ''}/>
					<Label text='Password'/>
					<PasswordField password={password} handlePassword={handlePassword} placeholder='Enter your Password'/>
					<div className='LoginForm-forgot-password' onClick={goToResetPassword}>Forgot Password ?</div>
					<Typography variant='body2' mt={5} mb={3} color='red' sx={{float: 'left'}}>{failureMsg}</Typography>
					<AuthButton
						onClick={handleLogin}
						disabled={email?.length === 0
							|| password?.length === 0
							|| email === undefined
							|| password === undefined
							|| errorEmail === Boolean(1)}
						loading={loading}
					>Log In
					</AuthButton>
					<Typography variant='body2' mt={2}>New to JIVA? Contact your Admin for your account.</Typography>
				</GridItem>
			</Grid>
			<Grid item xs>
				<GridItem/>
			</Grid>
			<Grid item xs mt={1}>
				<GridItem><JivaLogo/></GridItem>
			</Grid>
		</Grid>
	);
};

export default LoginForm;
