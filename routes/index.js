const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const phishController = require('../controllers/phishController');
const billingController = require('../controllers/billingController');
const surveyController = require('../controllers/surveyController');

// router.get('/api/surveys', authController.checkLogin, surveyController.getSurveys);
// router.post('/api/surveys', authController.checkLogin, authController.checkCredits, surveyController.sendSurveys);

// router.get('/api/surveys/:surveyId/:choice', surveyController.thanksPage);
// router.post('/api/surveys/webhooks', surveyController.webhooks);


router.get( '/auth/google', authController.googleLogin);
router.get('/auth/google/callback', authController.googleCallback, authController.googleRedirect);
router.get('/api/logout', authController.googleLoginOut);
router.get('/api/current_user', authController.currentUser);

router.get('/phishnet/setlist', authController.checkLogin, phishController.collectSetData, phishController.generateSetlist);

router.post('/api/stripe', authController.checkLogin, billingController.getPayed);


module.exports = router;