const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var CommentSchema = new mongoose.Schema({
    //     idClass: Number,
        email: String,
        comentariosClass: String,
        motivoEstado: String,
        estadoComments: String,
        valoracionClass: String,
        course: {type: mongoose.Types.ObjectId, ref: "Course"}
})

CommentSchema.plugin(mongoosePaginate);

module.exports= mongoose.model("Comment", CommentSchema);