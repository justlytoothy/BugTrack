import express from 'express'
import userController from '../controller/userController.js'
import projectController from '../controller/projectController.js'
import bodyParser from 'body-parser'
import auth from '../middleware/auth.js'
const router = express.Router()

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * User Login and Auth Routes
 * Separate later into separate controllers
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/user', function (req, res) {
	userController.newUser(req, res)
})
router.put('/user', function (req, res) {
	userController.editUser(req, res)
})
router.post('/user/login', function (req, res) {
	userController.loginUser(req, res)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Display Users
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/user', auth.verifyToken, function (req, res) {
	userController.getUsers(req, res)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Project Routes
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/project', auth.verifyToken, function (req, res) {
	projectController.newProject(req, res)
})
router.get('/project/all', auth.verifyToken, function (req, res) {
	projectController.getAllProjects(req, res)
})
router.get('/project', auth.verifyToken, function (req, res) {
	projectController.getProject(req, res)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default router
