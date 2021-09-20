//basic router imports
const  { Router } = require('express');
const router = Router();

//middleware
const requireAuth = require('../../../middlewares/requireAuth');

//controller imports
const negotiationControllers = require('../../../controllers/negotiationControllers');

//routes
router.post('/', requireAuth, negotiationControllers.negotiation_post);

module.exports = router;