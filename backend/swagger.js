const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'Notes-App',
        description: 'This API provides Authentication, Crud of notes, search and Pinning.',
    },
    servers: [
        {
            url: "http://localhost:8002",
        },
    ],
    securityDefinitions: {
        BearerAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Provide the token in the format: `Bearer <token>`",
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
};

const outputFile = './swagger-output.json';

const routes = ['./routes/*.js'];

swaggerAutogen(outputFile, routes, doc);
