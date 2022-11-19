var express = require('express')
var router = express.Router()
var CommentController = require('../controllers/comment.controller');
// var UploadController = require('../controllers/upload.controller');
// var MailController = require('../controllers/mail.controller');
var Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/registerComment', CommentController.createComment)
// router.post('/login/', CommentController.loginUser)
router.get('/obtenerComments',Authorization, CommentController.getComments)
// router.post('/userByMail', Authorization, CommentController.getUsersByMail)
router.put('/updateComment', Authorization, CommentController.updateComment)
router.delete('/:id', Authorization, CommentController.removeComment)
// router.post('/guardarImgUser',CommentController.guardarImagenUser)
// router.post('/uploadImg',UploadController.uploadFilesImgUser);
// router.post('/imgUserByMail',Authorization,CommentController.getImagenUserByMail)
// router.post('/sendMail',MailController.sendEmail)



// Export the Router
module.exports = router;



