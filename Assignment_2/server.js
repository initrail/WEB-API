require('dotenv').config()
var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var authController = require('./auth')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))

app.use(passport.initialize())

var router = express.Router()

var notSupported = 'This method is not supported.'

var secretKey = process.env.SECRET_KEY

var param = 'This request has no query parameters'

router.route('')
    .all(function (req, res) {
        res.send(notSupported)
    })

router.route('/get')
    .all(function (req, res) {
        if (req.method != 'GET') {
            res.send(notSupported)
        } else {
            var local = param
            if (Object.keys(req.query).length !== 0)
                local = req.query
            res.json({ params : local, headers : req.headers, SECRET_KEY: secretKey })
        }
    })

router.route('/post')
    .all(function (req, res) {
        if (req.method != 'POST') {
            res.send(notSupported)
        } else {
            var local = param
            if (Object.keys(req.query).length !== 0)
                local = req.query
            res.json({ params: local, headers : req.headers, SECRET_KEY: secretKey })
        }
    })

router.route('/put')
    .all(function (req, res) {
        if (req.method != 'PUT') {
            res.send(notSupported)
        } else {
            var local = param
            if (Object.keys(req.query).length !== 0)
                local = req.query
            res.json({ params: local, headers : req.headers, SECRET_KEY: secretKey })
        }
    })

router.route('/delete')
    .all(authController.isAuthenticated, function (req, res) {
        if (req.method != 'DELETE') {
            res.send(notSupported)
        } else {
            var local = param
            if (Object.keys(req.query).length !== 0)
                local = req.query
            res.json({ params : local, headers : req.headers, SECRET_KEY: secretKey })
        }
    })

app.use('/', router)
app.listen(1010)
