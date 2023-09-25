
import React, {} from 'react';
import {useNavigate} from 'react-router-dom';
import './AuthenticationFlow.css';
import AuthLayout from '../layout/AuthLayout';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword: React.FC = () => {
	const navigate = useNavigate();
	const goToLogin = () => {
		navigate('/login');
	};

	const goToSuccessPage = (email: string) => {
		navigate(`/reset-password-success/${email}`);
	};

	const ResetPasswordComponent = () => (
		<ResetPasswordForm goToLogin={goToLogin} goToSuccessPage={goToSuccessPage}/>
	);
	return (
		<AuthLayout SubComponent={ResetPasswordComponent}/>
	);
};

export default ResetPassword;
