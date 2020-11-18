import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
} from 'react-router-dom';
import SignIn from './pages/signIn';
import Search from './pages/search';

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" render={() => <SignIn />} />
				<Route exact path="/search" render={() => <Search />} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
