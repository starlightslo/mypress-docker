'use strict'

const config = require('../../config/config')

const fs = require('fs')
const express = require('express')
const router = express.Router({mergeParams: true})
const controller = require('../controllers/admin')
const authController = require('../controllers/auth')

const multipart = require('connect-multiparty')

const PRELOAD_PATH = './app/routes/preloads'

/**
 * Preload 
 */
 let preloadList = []
fs.readdirSync(PRELOAD_PATH).forEach(file => {
	if (file.endsWith('.js')) {
		preloadList.push(require(config.root + '/' + PRELOAD_PATH + '/' + file))
	}
})

/**
 * Routers
 */
router.get('/', authController.checkAuth, preloadList, controller.index)
router.get('/user', authController.checkAuth, preloadList, controller.user)
router.get('/user/add', authController.checkAuth, preloadList, controller.addUser)
router.get('/user/view/:username', authController.checkAuth, preloadList, controller.viewUser)
router.get('/user/validate/:username', authController.checkAuth, preloadList, controller.validateUser)
router.post('/user/add', authController.checkAuth, preloadList, controller.insertUser)
router.post('/user/edit/:username', authController.checkAuth, preloadList, controller.editUser)
router.post('/user/upload/:username', authController.checkAuth, preloadList, multipart(), controller.uploadPicture)
router.delete('/user/:username', authController.checkAuth, preloadList, controller.deleteUser)

router.get('/menu', authController.checkAuth, preloadList, controller.menu)
router.get('/menu/add', authController.checkAuth, preloadList, controller.addMenu)
router.get('/menu/view/:key', authController.checkAuth, preloadList, controller.viewMenu)
router.post('/menu/add', authController.checkAuth, preloadList, controller.insertMenu)
router.post('/menu/edit/:key', authController.checkAuth, preloadList, controller.editMenu)
router.delete('/menu/:key', authController.checkAuth, preloadList, controller.deleteMenu)

router.get('/portfolio', authController.checkAuth, preloadList, controller.portfolio)
router.get('/portfolio/add', authController.checkAuth, preloadList, controller.addPortfolio)
router.get('/portfolio/view/:key', authController.checkAuth, preloadList, controller.viewPortfolio)
router.post('/portfolio/add', authController.checkAuth, preloadList, controller.insertPortfolio)
router.post('/portfolio/edit/:key', authController.checkAuth, preloadList, controller.editPortfolio)
router.post('/portfolio/upload/:key', authController.checkAuth, preloadList, multipart(), controller.uploadPortfolioPicture)
router.delete('/portfolio/:key', authController.checkAuth, preloadList, controller.deletePortfolio)

router.get('/skill', authController.checkAuth, preloadList, controller.skill)
router.get('/skill/add', authController.checkAuth, preloadList, controller.addSkill)
router.get('/skill/view/:key', authController.checkAuth, preloadList, controller.viewSkill)
router.post('/skill/add', authController.checkAuth, preloadList, controller.insertSkill)
router.post('/skill/edit/:key', authController.checkAuth, preloadList, controller.editSkill)
router.delete('/skill/:key', authController.checkAuth, preloadList, controller.deleteSkill)

router.get('/experience', authController.checkAuth, preloadList, controller.experience)
router.get('/experience/add', authController.checkAuth, preloadList, controller.addExperience)
router.get('/experience/view/:key', authController.checkAuth, preloadList, controller.viewExperience)
router.post('/experience/add', authController.checkAuth, preloadList, controller.insertExperience)
router.post('/experience/edit/:key', authController.checkAuth, preloadList, controller.editExperience)
router.post('/experience/upload/:key', authController.checkAuth, preloadList, multipart(), controller.uploadExperiencePicture)
router.delete('/experience/:key', authController.checkAuth, preloadList, controller.deleteExperience)

router.get('/settings/language', authController.checkAuth, preloadList, controller.settingsLanguage)
router.get('/settings/language/add', authController.checkAuth, preloadList, controller.addSettingsLanguage)
router.get('/settings/language/view/:id', authController.checkAuth, preloadList, controller.viewSettingsLanguage)
router.get('/settings/language/validate/:name', authController.checkAuth, preloadList, controller.validateSettingsLanguage)
router.post('/settings/language/add', authController.checkAuth, preloadList, controller.insertSettingsLanguage)
router.post('/settings/language/edit/:id', authController.checkAuth, preloadList, controller.editSettingsLanguage)
router.delete('/settings/language/:id', authController.checkAuth, preloadList, controller.deleteSettingsLanguage)

router.get('/settings/template', authController.checkAuth, preloadList, controller.settingsTemplate)
router.post('/settings/template/edit', authController.checkAuth, preloadList, controller.editSettingsTemplate)

router.get('/settings/system', authController.checkAuth, preloadList, controller.settingsSystem)
router.post('/settings/system/edit', authController.checkAuth, preloadList, controller.editSettingsSystem)
router.post('/settings/system/upload', authController.checkAuth, preloadList, multipart(), controller.uploadSettingsSystemPicture)

module.exports = router