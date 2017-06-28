const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
// var user = require('./routes/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// //error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//connect to mlab for data access
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// Connection URL
var url = 'mongodb://argouser:runfrodorun@ds135252.mlab.com:35252/argodb_survey';
// Use connect method to connect to the server
var db;
MongoClient.connect(url, function(err, database) {
  assert.equal(null, err);
  db = database;
  console.log("Connected successfully to server");
  //TO-DO database manipulation
  
  //db.close();
});
//get question from database
// app.get('/', (req, res) => {
//   var cursor = db.collection('question').find().toArray(function(err, results) {
//   console.log(results)
//   // send HTML file populated with quotes here
// })
// });

app.get('/',function(req,res){
  console.log("get requrest recieved!")
  var cursor = db.collection('SurveyTemplate').find();
  res.jsonp (cursor.toArray());
});

app.post('/',function(req,res){
  console.log("post request recieved!");
  var id=req.body.id;
  var question=req.body.question;
  var answer = req.body.answer;
  //adding it to db 
  db.collection('SurveyTemplate').insertOne(
   {
     "id": id,
     "question": question,
     "answer": answer
    }

  )
  res.end("yes");
});
app.listen(3000, function() {
  console.log('listening on 3000')
});
module.exports = app;
