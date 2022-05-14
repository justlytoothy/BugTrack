import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3500/'
if (sessionStorage.getItem('user')) {
	const userPre = sessionStorage.getItem('user')
	const user = JSON.parse(userPre)
	if (user.token) {
		axios.defaults.headers.common['x-access-token'] = user.token
	}
}

export default axios
