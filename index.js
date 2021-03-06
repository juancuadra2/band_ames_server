const express = require('express');
const path = require('path');
require('dotenv').config();

//App de express
const app = express();

//Node server socket
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');



// CARPETA PUBLICA
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath))

server.listen(process.env.PORT, err => !err ? console.log(`Puerto corriendo en puerto ${ process.env.PORT }`) : new Error(err) );