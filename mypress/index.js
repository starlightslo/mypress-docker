'use strict'

const fs = require('fs')
const path = require('path')

const Utils = require('./app/modules/utils')

const config = require('./config/config')
const server = require('./app/modules/server')
const myServer = new server(config)


const MIDDLEWARE_PATH = './app/middlewares'
const PASSPORT_PATH = './app/passports'
const PUBLIC_DIRECTORY_PATH = 'public'
const TABLES_SCHEMA_PATH = './config/tables'

// Creating require directories
Utils.ensureExists('public/uploads', () => {})

// Get all table schema and run migration
const Migration = (require('./config/migration'))
let promiseList = []
fs.readdirSync(TABLES_SCHEMA_PATH).forEach(file => {
	if (file.endsWith('.js')) {
		promiseList.push(Migration.run(require(TABLES_SCHEMA_PATH + '/' + file)))
	}
})
Promise.all(promiseList).then(() => {
	console.log('successful')
})

// Auto include the third-party middlewares
fs.readdirSync(MIDDLEWARE_PATH).forEach(file => {
	if (file.endsWith('.js')) {
		myServer.setMiddleware(require(MIDDLEWARE_PATH + '/' + file))
	}
})

// Auto include the strategies
fs.readdirSync(PASSPORT_PATH).forEach(file => {
	if (file.endsWith('.js')) {
		myServer.setPassport(require(PASSPORT_PATH + '/' + file))
	}
})

// Loading the routes
require('./config/routes')(myServer.app)

// Set the public directory
myServer.setPublicDirectory(path.join(config.root, PUBLIC_DIRECTORY_PATH))

// Get the port number from arguments
const port = process.argv[2] || config.port

// Start to listen on port
myServer.listen(port)
