
import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {CustomContext} from '../utilities/CustomContext';
import './AuthenticationFlow.css';
import AuthLayout from '../layout/AuthLayout';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
	const {
		updateAccessToken,
		updateUsername,
		updateRefreshToken,
		handleAuthentication,
	} = useContext(CustomContext);

	const navigate = useNavigate();
	const goToResetPassword = () => {
		navigate('/reset-password');
	};

	const goToSearch = () => {
		navigate('/search');
	};

	const LoginComponent = () => (
		<LoginForm
			goToResetPassword={goToResetPassword}
			goToSearch={goToSearch}
			updateAccessToken={updateAccessToken}
			updateRefreshToken={updateRefreshToken}
			updateUsername={updateUsername}
			handleAuthentication={handleAuthentication}/>);

	return (
		<AuthLayout SubComponent={LoginComponent}/>
	);
};

export default Login;
