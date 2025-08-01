const express = require('express');
const multer = require('multer');
const verifyToken = require('./config/verifyToken');

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');
const uploadConfig = require('./config/upload');
const NewsController = require('./controllers/NewsController');
const ContactUsController = require('./controllers/ContactusController');
const SourcesController = require('./controllers/SourcesController');

const routes = express.Router();
const upload = multer(uploadConfig)

//var var2 = app.locals;

routes.get('/status', (req, res)=>{
    res.send({ status : 200})
});


//new ones: Tested *************************************************

routes.get('/api/news/search', NewsController.searchNews);
routes.get('/api/news/latest', NewsController.getLatestNews);
routes.get('/api/news/popular', NewsController.getPopularNews);
routes.get('/api/news', NewsController.getFilteredNews);
routes.get('/api/news/:shortId', NewsController.getNewsByShortId);
// routes.get('/api/news/:id/', NewsController.getNewsDetails);

routes.get('/api/getSources', SourcesController.getAllSources);
routes.get('/api/getOneSourceNews/:sourceName', NewsController.getOneSourceNews);

routes.post('/api/contact', ContactUsController.createContact);
routes.post('/api/report', ContactUsController.reportProblem);

routes.post('/api/register', UserController.createUser);
routes.post('/api/login', LoginController.login);



//******************************************************************* */




//TODO: add todo extension VSCODE

//Registration
routes.post('/registration/:eventId', verifyToken, RegistrationController.create);
routes.get('/registration', verifyToken, RegistrationController.getMyRegistrations);
routes.get('/registration/:registration_id', RegistrationController.getRegistration)
routes.post('/registration/:registration_id/approvals', verifyToken, ApprovalController.approval);
routes.post('/registration/:registration_id/rejections', verifyToken, RejectionController.rejection);

//login
routes.post('/login', LoginController.store);

routes.get('/getNews', NewsController.getAllNews);
routes.get('/getOneNews/:_id', NewsController.getOneNews);
routes.post('/getNewsType', NewsController.getNewsTypes);
routes.post('/getMostVisitedDaily', NewsController.getMostVisitedDaily);
routes.post('/getMostVisitedWeekly', NewsController.getMostVisitedWeekly);
routes.post('/getMostCommentedDaily', NewsController.getMostCommentedDaily);
routes.post('/getMostCommentedweekly', NewsController.getMostCommentedweekly);
routes.get('/getOneTypeNews/:newsType', NewsController.getOneTypeNews);






//Dashboard:
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents)
routes.get('/user/events', verifyToken, DashboardController.getEventsByUserId)
routes.get('/event/:eventId',verifyToken, DashboardController.getEventById)


//Events:
routes.post('/event', verifyToken, upload.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:eventId', verifyToken, EventController.delete)

//User
// routes.post('/user/register', UserController.createUser);
// routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;