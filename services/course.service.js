// Gettign the Newly created Mongoose Model we just created 
var Course = require('../models/Course.model');


// Saving the context of this module inside the _the variable
_this = this

exports.getCourses = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Courses = await Course.paginate(query, options)
        // Return the Courses list that was retured by the mongoose promise
        return Courses;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Courses');
    }
}

exports.createCourse = async function (course) {
    // Creating a new Mongoose Object by using the new keyword
    var newCourse = new Course({
        nameClass: course.nameClass,
        descriptionClass: course.descriptionClass,
        mailProfesor: course.mailProfesor,
        duracionClass: course.duracionClass,
        frecuenciaClass: course.frecuenciaClass,
        costoClass: course.costoClass,
        estadoClass: course.estadoClass,
        comments: course.comments
    })

    try {
        // Saving the Course 
        var savedCourse = await newCourse.save();
        savedCourse._id
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Course")
    }
}

exports.updateCourse = async function (course) {
    
    var id = {idClass :course.idClass}
    //console.log(id)
    console.log(course)
    try {
        //Find the old Class Object by the Id
        var oldCourse = await Course.findOne(id);
        console.log(oldCourse)
    } catch (e) {
        throw Error("Error occured while Finding the Course")
    }
    // If no old Class Object exists return false
    if (!oldCourse) {
        return false;
    }
    //Edit the Class Object
    if (course.nameClass!=null){
        oldCourse.nameClass=course.nameClass
    }
    if (course.descriptionClass!=null){
        oldCourse.descriptionClass= course.descriptionClass
    }
    if (course.duracionClass!=null){
        oldCourse.duracionClass = course.duracionClass
    }
    if (course.frecuenciaClass!=null){
        oldCourse.frecuenciaClass = course.frecuenciaClass
    }
    if (course.costoClass!=null){
        oldCourse.costoClass = course.costoClass
    }
    if (course.comments!=null){
        oldCourse.comments = course.comments
    }
    try {
        var savedCourse = await oldCourse.save()
        return savedCourse;
    } catch (e) {
        throw Error("And Error occured while updating the Class");
    }
}

exports.deleteCourse = async function (id) {

    // Delete the Course
    try {
        var deleted = await Course.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Class Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Class")
    }
}