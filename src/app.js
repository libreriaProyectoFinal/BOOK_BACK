const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index');
const rateLimit = require('express-rate-limit');
require("./db");

const server = express();

// const limiter = rateLimit({
//  windowMs: 15 * 60 * 1000, // 15 minutos
//  max: 100, // número máximo de peticiones por IP
//  message: 'Too many requests from this IP, please try again later.'
// });

server.use(cors());
server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
// server.use(limiter);

server.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin','http://190.100.208.178:3000' ); 
  // res.header('Access-Control-Allow-Credentials', true); 
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'  );
  // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH' );
  // next();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();  }  );
server.use('/', routes);

server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
}
);

module.exports = server;
