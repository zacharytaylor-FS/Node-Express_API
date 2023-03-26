const http = require('http');
const app = require('./app/app');
require('dotenv').config();

http.createServer(app).listen(process.env.PORT || 3000, () => console.log(`NodeJS Server Listening on port: ${process.env.PORT}`))