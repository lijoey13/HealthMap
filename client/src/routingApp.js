import React from 'react';
import App from './searchPage/App.js';
import HomeSearch from './homePage/HomeSearch.js';
import ResultPage from './searchPage/Results/ResultPage.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


class RoutingApp extends React.Component {
	render () {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/home" component = {HomeSearch} />
					<Route path="/search" component = {App} />
					<Route path="/result" component = {ResultPage} />
					<Route path="/" component = {HomeSearch} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default RoutingApp;
