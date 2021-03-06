import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardComponent from '../dashboard/dashboardComponent';
import EmployeesComponent from '../employees/employeesComponent';
import common from '../../common/commonImports';
import ProjectsComponentNew from '../projects/projectsComponentNew';
import ProjectDetails from '../projects/projectdetails/projectDetailsComponent';
import TicketDetails from '../tickets/ticketDetailsComponent';
import Layout from '../../common/layout';

const MyRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<DashboardComponent />} />
					<Route
						path='/projects'
						element={<ProjectsComponentNew />}
					/>
					<Route path='/project/:id' element={<ProjectDetails />} />
					<Route path='/ticket/:id' element={<TicketDetails />} />
					<Route path='/employees' element={<EmployeesComponent />} />
					<Route path='*' element={<common.ErrorPageComponent />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default MyRoutes;
