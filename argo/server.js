const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
// var user = require('./routes/user');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

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

//get sample questions when start
app.get('/api/questions/get',function(req,res){
  console.log("questions/get requrest recieved!");
  var dbName = res.body.dbName;
  if(dbName==''){
    dbName = 'SurveyTemplate';
  }
  db.collection(dbName).find()
  .toArray((err, docs)=>{
    if(err){
    console.log('err');
    res.send('err');
  }else{
    res.jsonp(docs)}
  });
});

//get already made surveys
app.get('/api/surveys/get',function(req,res){
  console.log("surveys/get requrest recieved!")
  var dbName = res.body.dbName;
  db.collection(dbName).find()
  .toArray((err, docs)=>{
    if(err){
    console.log('err');
    res.send('err');
  }else{
    res.jsonp(docs)}
  });
});


//post questions to the db
app.post('/api/questions/post',function(req,res){
  console.log("post request recieved!");
  var id=req.body.id;
  var question=req.body.question;
  var answer = req.body.answer;
  var dbName = req.body.dbName;
  //adding it to db 
  db.collection(dbName).insertOne(
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
