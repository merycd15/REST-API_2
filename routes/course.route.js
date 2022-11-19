var express = require('express')
var router = express.Router()
var CourseController = require('../controllers/course.controller');
// var UploadController = require('../controllers/upload.controller');
// var MailController = require('../controllers/mail.controller');
var Authorization = require('../auth/authorization');

// Authorize each API with middleware and map to the Controller Functions
router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de Clases');
  });
router.post('/registerClass', CourseController.createCourse)
// router.post('/login/', CourseController.loginUser)
router.get('/obtenerClasses',Authorization, CourseController.getCourses)
// router.post('/userByMail', Authorization, CourseController.getUsersByMail)
router.put('/updateClass', Authorization, CourseController.updateCourse)
router.delete('/:id', Authorization, CourseController.removeCourse)
// router.post('/guardarImgUser',CourseController.guardarImagenUser)
// router.post('/uploadImg',CourseController.uploadFilesImgUser);
// router.post('/imgUserByMail',Authorization,CourseController.getImagenUserByMail)
// router.post('/sendMail',MailController.sendEmail)

// Export the Router
module.exports = router;