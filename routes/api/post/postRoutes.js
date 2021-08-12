//basic router imports
const  { Router } = require('express');
const router = Router();

//middleware
const requireAuth = require('../../../middlewares/requireAuth');

//controller imports
const postControllers = require('../../../controllers/postControllers');

//routes
router.get('/', requireAuth, postControllers.allPost_get);
router.get('/my-post', requireAuth, postControllers.myPost_get);
router.post('/create', requireAuth, postControllers.create_post);

module.exports = router;