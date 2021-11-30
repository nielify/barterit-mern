//basic router imports
const  { Router } = require('express');
const router = Router();

//middleware
const requireAuth = require('../../../middlewares/requireAuth');

//controller imports
const verificationControllers = require('../../../controllers/verificationControllers');

//routes
router.get('/all', requireAuth, verificationControllers.allVerifications_get);

module.exports = router;