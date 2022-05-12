import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from '../home/homeComponent';
import common from '../../common/commonImports';
import ViewBugsComponent from '../viewBugs/viewBugsComponent';
import Layout from '../../common/layout';

const MyRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomeComponent />} />
					<Route path='/viewbugs' element={<ViewBugsComponent />} />
					<Route path='*' element={<common.ErrorPageComponent />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default MyRoutes;
