const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// routes
exports.helloWorld = require('./routes/helloWorld')

// triggers
exports.onUserStatusChange = require('./triggers/onUserStatusChange')
exports.onCleverbotMessage = require('./triggers/onCleverbotMessage')
