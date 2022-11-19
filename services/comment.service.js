// Gettign the Newly created Mongoose Model we just created 
// var Comment = require('../models/Comment.model');
var Comment = require('../models/comment.model');


// Saving the context of this module inside the _the variable
_this = this

exports.getComments = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Comments = await Comment.paginate(query, options)
        // Return the Comments list that was retured by the mongoose promise
        return Comments;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Comment');
    }
}

exports.createComment = async function (comment) {
    // Creating a new Mongoose Object by using the new keyword
    var newComment = new Comment({
        // idClass: comment.idClass,
        email: comment.email,
        comentariosClass: comment.comentariosClass,
        motivoEstado: comment.motivoEstado,
        estadoComments: comment.estadoComments,
        valoracionClass: comment.valoracionClass,
        course: comment.course
    })

    try {
        // Saving the Comment 
        var savedComment = await newComment.save();
        savedComment._id
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Comment")
    }
}

exports.updateComment = async function (comment) {
    
    var id = {id :comment.id}
    //console.log(id)
    console.log(comment)
    try {
        //Find the old Class Object by the Id
        var oldComment = await Comment.findOne(id);
        console.log(oldComment)
    } catch (e) {
        throw Error("Error occured while Finding the Comment")
    }
    // If no old Class Object exists return false
    if (!oldComment) {
        return false;
    }
    //Edit the Class Object
    if (comment.comentariosClass!=null){
        oldComment.comentariosClass=comment.comentariosClass
    }
    if (comment.motivoEstado!=null){
        oldComment.motivoEstado= comment.motivoEstado
    }
    if (comment.estadoComments!=null){
        oldComment.estadoComments = comment.estadoComments
    }
    if (comment.valoracionClass!=null){
        oldComment.valoracionClass = comment.valoracionClass
    }
    try {
        var savedComment = await oldComment.save()
        return savedComment;
    } catch (e) {
        throw Error("And Error occured while updating the Comment");
    }
}

exports.deleteComment = async function (id) {

    // Delete the Comment
    try {
        var deleted = await Comment.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Class Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Comment")
    }
}