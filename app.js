const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectionString = "mongodb+srv://admin:adminadmin@cluster0.cyvx5k9.mongodb.net/?appName=Cluster0";
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { verifyToken } = require('./middleware/auth');

dotenv.config();
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("MongoDB connection established successfully");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

const listsRouter = require('./routes/shopping-list');
const itemsRouter = require('./routes/item');
const usersRouter = require('./routes/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/shopping-lists', verifyToken, listsRouter);
app.use('/items', verifyToken, itemsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
