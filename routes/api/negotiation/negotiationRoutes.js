//basic router imports
const  { Router } = require('express');
const router = Router();

//middleware
const requireAuth = require('../../../middlewares/requireAuth');

//controller imports
const negotiationControllers = require('../../../controllers/negotiationControllers');

//routes
router.post('/', requireAuth, negotiationControllers.negotiation_post);
router.get('/negotiations', requireAuth, negotiationControllers.negotiations_get);
router.get('/:negotiation_id', requireAuth, negotiationControllers.negotiation_get);
router.post('/meetingplace', requireAuth, negotiationControllers.meetingPlace_post)
router.post('/meetingplace/agree', requireAuth, negotiationControllers.meetingPlaceAgree_post)

module.exports = router;