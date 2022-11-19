var CommentService = require('../services/comment.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.getComments = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Comment = await CommentService.getComments({}, page, limit)
        // Return the Comments list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comment, message: "Succesfully Comment Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createComment = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Comment = {
        // idClass: req.body.idClass,
        email: req.body.email,
        comentariosClass: req.body.comentariosClass,
        motivoEstado: req.body.motivoEstado,
        estadoComments: req.body.estadoComments,
        valoracionClass: req.body.valoracionClass,
        course: req.body.course
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdComment = await CommentService.createComment(Comment)
        return res.status(201).json({createdComment, message: "Succesfully Created Comment"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Comment Creation was Unsuccesfull"})
    }
}

exports.updateComment = async function (req, res, next) {

    //Id is necessary for the update
    if (!req.body.idComments) {
        return res.status(400).json({status: 400., message: "Id Comment be present"})
    }

    
    var Comment = {
        idClass: req.body.idClass ? req.body.idClass : null,
        idAlumno: req.body.idAlumno? req.body.idAlumno : null,
        comentariosClass: req.body.comentariosClass? req.body.comentariosClass : null,
        motivoEstado: req.body.motivoEstado? req.body.motivoEstado : null,
        estadoComments: req.body.estadoComments? req.body.estadoComments : null,
        valoracionClass: req.body.valoracionClass? req.body.valoracionClass : null
    }
    try {
        var updatedComment = await CommentService.updateComment(Comment)
        return res.status(200).json({status: 200, data: updatedComment, message: "Succesfully Updated Comment"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeComment = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await CommentService.deleteComment(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}    
    
