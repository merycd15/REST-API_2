const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js', './routes/user.route.js', './routes/utils.js']

const basicInformation = {
    info: {
        version: "1.0.0",
        title: "API - Node JS",
        description: "Web Services Documentation"
    },
}
swaggerAutogen(outputFile, endpointsFiles, basicInformation);
