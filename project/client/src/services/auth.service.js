import axios from 'axios';
const API_URL = 'http://localhost:3500/api/auth/';

const register = (username, email, password) => {
	return axios.post(API_URL + 'signup', {
		username,
		email,
		password,
	});
};

const login = (username, password) => {
	return axios.post(API_URL + 'login', {
		username,
		password,
	});
};

const logout = () => {
	localStorage.removeItem('user');
};

const authService = {
	register,
	login,
	logout,
};

export default authService;
