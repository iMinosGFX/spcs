import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';

const PublicRoutes = () => {
	return(
		<>
			<Switch>
				<Route path="/" component={Login} />
			</Switch>
		</>
	)
};

export default PublicRoutes;
