import React from 'react';
import {Navigate} from 'react-router-dom';
type ProtectedRoutes = {
	isSignedIn: boolean;
	children: React.ReactNode;
};
const Protected: React.FC<ProtectedRoutes> = ({isSignedIn, children}) => {
	if (!isSignedIn) {
		return <Navigate to='/login' replace />;
	}

	return children;
};

export default Protected;
