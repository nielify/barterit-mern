//basic router imports
const  { Router } = require('express');
const router = Router();

//middleware
const requireAuth = require('../../../middlewares/requireAuth');

//controller imports
const userControllers = require('../../../controllers/userControllers');

router.get('/', requireAuth, userControllers.user_get);
router.post('/verify-account/:id', requireAuth, userControllers.verifyAccount_post);
router.get('/search/:name', requireAuth, userControllers.userSearch_get);
router.get('/all-users', requireAuth, userControllers.allUsers_get);
router.get('/saved-items/', requireAuth, userControllers.savedItems_get);
router.post('/saved-items/:id', requireAuth, userControllers.saveItems_post)
router.delete('/saved-items/:id', requireAuth, userControllers.savedItems_delete);
router.post('/forgot-password', userControllers.forgotPassword_post);
router.get('/:userId/reset-password/:token', userControllers.resetPassword_get);
router.post('/:userId/reset-password/:token', userControllers.resetPassword_post);
router.get('/:userId', userControllers.viewUser_get);
router.delete('/:user_id/:negotiation_id', requireAuth, userControllers.notification_delete);
router.post('/rate/:owner_id', requireAuth, userControllers.rateUser_post);
router.post('/ban/:user_id', requireAuth, userControllers.banUser_post);
router.post('/verify/:user_id', requireAuth, userControllers.verifyUser_post);

//profile
router.post('/change-picture', requireAuth, userControllers.changePicture_post);
router.post('/change-background', requireAuth, userControllers.changeBackground_post);

module.exports = router;