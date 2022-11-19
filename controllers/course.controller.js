var CourseService = require('../services/course.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.getCourses = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Course = await CourseService.getCourses({}, page, limit)
        // Return the Courses list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Course, message: "Succesfully Classes Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createCourse = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Course = {
        nameClass: req.body.nameClass,
        descriptionClass: req.body.descriptionClass,
        mailProfesor: req.body.mailProfesor,
        duracionClass: req.body.duracionClass,
        frecuenciaClass: req.body.frecuenciaClass,
        costoClass: req.body.costoClass,
        estadoClass: req.body.estadoClass,
        comments: req.body.comments
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdCourse = await CourseService.createCourse(Course)
        return res.status(201).json({createdCourse, message: "Succesfully Created Course"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Course Creation was Unsuccesfull"})
    }
}

exports.updateCourse = async function (req, res, next) {

    //Id is necessary for the update
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id be present"})
    }

    
    var Course = {
        nameClass: req.body.nameClass ? req.body.nameClass : null,
        descriptionClass: req.body.descriptionClass ? req.body.descriptionClass : null,
        mailProfesor: req.body.mailProfesor ? req.body.mailProfesor : null,
        duracionClass: req.body.duracionClass ? req.body.duracionClass : null,
        frecuenciaClass: req.body.frecuenciaClass ? req.body.frecuenciaClass : null,
        costoClass: req.body.costoClass ? req.body.costoClass : null,
        // comments: req.body.comments ? req.body.comments : null
    }
    try {
        var updatedCourse = await CourseService.updateCourse(Course)
        return res.status(200).json({status: 200, data: updatedCourse, message: "Succesfully Updated Course"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeCourse = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await CourseService.deleteCourse(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}    
    
