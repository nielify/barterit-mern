//basic router imports
const  { Router } = require('express');
const router = Router();

//middleware
const requireAuth = require('../../../middlewares/requireAuth');

//controller imports
const postControllers = require('../../../controllers/postControllers');

router.get('/', requireAuth, postControllers.post_get);

module.exports = router;