//Express
var express = require('express');
var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');

// Swagger needs
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json');
const basicAuth = require('express-basic-auth');

//incorporo cors
var cors = require('cors');

//importo router
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/user.route'); //Custom
var apiRouterCourse = require('./routes/course.route'); 
var apiRouterComment = require('./routes/comment.route'); 
var utilRouter = require('./routes/utils');

//instancio el servidor
var app = express();

//engine que permite renderizar paginas web
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//aplico cors
app.use(cors());
app.use(cookieParser());

//Indico las rutas de los endpoint
app.use('/users', apiRouter);
app.use('/course', apiRouterCourse);
app.use('/comment', apiRouterComment);
app.use('/', indexRouter);
app.use('/utils/',utilRouter);

//onsole.log("processENV",process.env);
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}


//Database connection --
var mongoose = require('mongoose')
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
console.log("BD",url);
let opts = {
  useNewUrlParser : true, 
  connectTimeoutMS:20000, 
  useUnifiedTopology: true
  };

mongoose.connect(url,opts)
  .then(() => {
    console.log(`Succesfully Connected to theMongodb Database..`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`),
    console.log(e)
  })


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
});


// Setup server port
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('Servidor de ABM Users iniciado en el puerto ',port);
});

/****************
 * SWAGGER
 ****************/
 var swaggerUiOptions = {
	explorer: false,
	operationsSorter: 'alpha',
}

// Swagger basic Auth 
app.use('/doc', basicAuth({
	users: {
		'admin': 'admin'
	},
	challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerUiOptions));

module.exports = app;