//basic router imports
const  { Router } = require('express');
const router = Router();

//middleware
const requireAuth = require('../../../middlewares/requireAuth');

//controller imports
const reportControllers = require('../../../controllers/reportControllers');

//routes
router.post('/', requireAuth, reportControllers.report_post);
router.get('/', requireAuth, reportControllers.allReports_get);

module.exports = router;