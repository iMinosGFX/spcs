import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Register from "./Pages/Register"

const PublicRoutes = () => {
	return(
		<>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/register" component={Register} />
			</Switch>
		</>
	)
};

export default PublicRoutes;
