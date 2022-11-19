const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const CourseSchema = new mongoose.Schema({
    nameClass: String,
    descriptionClass: String,
    mailProfesor: String,
    duracionClass: String,
    frecuenciaClass: String,
    costoClass: String,
    estadoClass: String,
    comments: String
})

// const CourseSchema = new mongoose.Schema({
//     nameClass: String,
//     descriptionClass: String,
//     mailProfesor: String,
//     duracionClass: String,
//     frecuenciaClass: String,
//     costoClass: String,
//     estadoClass: String,
//     comments: {type: mongoose.Schema.Types.ObjectId, ref: "Comment"}
// })


// var CommentSchema = new mongoose.Schema({
//     //     idClass: Number,
//         email: String,
//         comentariosClass: String,
//         motivoEstado: String,
//         estadoComments: String,
//         valoracionClass: String,
//         course: {type: mongoose.Types.ObjectId, ref: "Course"}
// })
//CommentSchema.plugin(mongoosePaginate);
CourseSchema.plugin(mongoosePaginate);

module.exports= mongoose.model("Course", CourseSchema);
//module.exports= mongoose.model("Comment", CommentSchema);