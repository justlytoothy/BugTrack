import userModel from '../model/userModel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const newUser = async (req, res, next) => {
	try {
		const { username, password, first_name, last_name, role } = req.body

		//Check for all input
		if (!(username && password && first_name && last_name && role)) {
			res.status(400).send('All fields are required')
		}

		//Check to see if already exists
		const check = await userModel.findOne({ username })
		if (check) {
			res.status(400).send('User already exists, please login')
		}

		//Encrypt Password
		const hashedPwd = await bcryptjs.hash(password, 10)

		const user = await userModel.create({
			first_name: first_name,
			last_name: last_name,
			username: username.toLowerCase(),
			password: hashedPwd,
		})

		const token = jwt.sign(
			{ user_id: user._id, username },
			process.env.REACT_APP_TOKEN_KEY,
			{
				expiresIn: '4h',
			}
		)

		user.token = token
		res.status(201).json(user)
	} catch (err) {
		console.log(err)
		res.status(400).json({ Error: error })
	}
}

const editUser = (req, res) => {
	const { _id, name, password, role } = req.body
	userModel
		.findByIdAndUpdate(_id, { name, password, role })
		.then((user) => {
			if (!user) return res.status(400).send('no user')
			res.send('updated')
		})
		.catch((err) => {
			if (err) res.status(400).send(err)
		})
}

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body
		if (!(username && password)) {
			res.status(400).send('All input is required')
		}
		const user = await userModel.findOne({ username })

		if (user && (await bcryptjs.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, username },
				process.env.REACT_APP_TOKEN_KEY,
				{
					expiresIn: '4h',
				}
			)
			user.token = token
			user.password = ''
			res.status(200).json(user)
		} else {
			res.status(400).send('Invalid Credentials')
		}
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
}
const getUsers = (req, res) => {
	userModel.find({}, (err, data) => {
		if (err) {
			return res.json({ Error: err })
		}
		return res.json(data)
	})
}

export default { newUser, editUser, loginUser, getUsers }
