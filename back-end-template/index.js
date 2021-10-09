const https = require('http');
const app = require('./app');

const port = 3003;

const server = https.createServer(app);

server.listen(port);