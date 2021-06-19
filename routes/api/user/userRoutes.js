//basic router imports
const  { Router } = require('express');
const router = Router();

//controller imports
const apiController = require('../../../controllers/apiControllers');

router.post('/forgot-password', apiController.forgotPassword_post);

module.exports = router;