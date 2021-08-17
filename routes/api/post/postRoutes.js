//basic router imports
const  { Router } = require('express');
const router = Router();

//middleware
const requireAuth = require('../../../middlewares/requireAuth');

//controller imports
const postControllers = require('../../../controllers/postControllers');

//routes
router.get('/', requireAuth, postControllers.allPost_get);
router.get('/my-posts', requireAuth, postControllers.myPosts_get);
router.post('/create', requireAuth, postControllers.create_post);
router.get('/:id', requireAuth, postControllers.post_get);
router.get('/category/:category', requireAuth, postControllers.category_get);
router.get('/user/:userId', requireAuth, postControllers.userPosts_get);

module.exports = router;