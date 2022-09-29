import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes/api.js'
import auth from './middleware/auth.js'

const app = express()
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * Connect to the Database
 */
mongoose.connect(
	process.env.REACT_APP_DB_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (!err) {
			return console.log('Connected to database')
		} else {
			console.log(err)
		}
	}
)
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * Routing
 */
app.use('/', router)
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

const PORT = process.env.REACT_APP_PORT || 3500
app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`)
})