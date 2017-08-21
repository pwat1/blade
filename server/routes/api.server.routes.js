// Invoke 'strict' JavaScript mode
'use strict';

const express = require('express');
const router = express.Router();
var api = require('../controllers/api.server.controller');

/* GET api listing. */
router.get('/', api.showRoutes);
router.get('/getversion', api.getVersion);

module.exports =  router;
