import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3500/'
axios.interceptors.request.use((request) => {
	if (
		sessionStorage.length > 0 &&
		sessionStorage.getItem('user') !== 'undefined'
	) {
		const userPre = sessionStorage.getItem('user')
		const user = JSON.parse(userPre)
		if (user.token) {
			request.headers.common['x-access-token'] = user.token
		}
	}
	return request
})
export default axios
