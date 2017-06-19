var express = require('express') ;
var fs = require('fs') ;
var bodyParser = require('body-parser') ;
var app = express() ;
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({extended:true})) ;
var users = new Object() ;


// the routing of HTTP GET
app.get('/listUsers',function(req,res){
	fs.readFile("./"+"users.json",'utf8',function(err,data){
		console.log(data) ;
		res.end(data) ;
	}) ;
})

app.get('/listUser/:uuid', function (req, res) {
   // First read existing users.
   fs.readFile( "./" + "users.json", 'utf8', function (err, data) {
     if(err){
       console.error("Go wrong") ;
       res.end("NOT Found , or JSON go wrong") ;
     }
       users = JSON.parse( data ); // object of json data
       var user = users["user" + req.params.uuid] ;
       console.log(user);
       res.end( JSON.stringify(user));
   });
})

// the routing of HTTP POST
app.post('/addUser', function (req, res) {
     var uuid  = req.body.uuid;
     var uname = req.body.uname;
     var prof  = req.body.prof;
     var passwd = req.body.passwd;
     var str = 'Name: '+ uname +', PROF: '+prof+' UUID: '+uuid+' PASS: '+ passwd;
     console.log( str );
     res.end(str);
     /* codes needed to add user data to users.json file */
     // Creat the object to store JSON Object
     fs.readFileSync("./users.json","utf-8",function(err){
        if(err){
          console.error("error") ;
        }
        users = JSON.parse(data) ;
     }) ;
     var user = {
       "name":uname ,
       "password":passwd ,
       "profession":prof,
       "id":uuid
     } ;
     // global Variable : Users ; add Key Values
     users["user"+uuid] = user ;
     // turn the object into the String
     var data = JSON.stringify(users) ;
     fs.writeFile("./users.json",data,function(err){
        if(err){
          console.log('error') ;
        }
        console.log(data) ;
     }) ;
})



app.put('/updateUser', function (req, res) {
     var uuid  = req.body.uuid;
     var uname = req.body.uname;
     var prof  = req.body.prof;
     var passwd = req.body.passwd;
     var str = 'UPDATE: Name: '+ uname +', PROF: '+prof+' UUID: '+uuid+' PASS: '+ passwd;
     console.log( str );
     res.write(str);
     // codes needed to update user data in users.json file 
     fs.readFile("./users.json",function(err,data){
        users = JSON.parse(data) ;
     }) ;

     if(users['user'+uuid]==undefined){
       console.log('user is not existed') ;
     }else{
       users['user'+uuid].name = uname ;
       users['user'+uuid].profession = prof ;
       users['user'+uuid].password = passwd ;
     }

     var data = JSON.stringify(users) ;
      fs.writeFile("./users.json",data,function(err){
      console.log(data) ;
      res.end(data) ;
    })
})
/*
app.put('/updateUser', function (req, res) {
   var uuid  = req.body.uuid;
     var uname = req.body.uname;
     var prof  = req.body.prof;
     var passwd = req.body.passwd;
     var str = 'UPDATE: Name: '+ uname +', PROF: '+prof+' UUID: '+uuid+' PASS: '+ passwd;
     console.log( str );
     res.end(str);
     /* codes needed to update user data in users.json file */
//})

app.delete('/deleteUser/:id', function (req, res) {

   fs.readFile("users.json", 'utf8', function (err, data) {
       users = JSON.parse( data ); // object of json data
   });

   delete users["user" + req.params.id] ;
   var data = JSON.stringify(users) ;
   fs.writeFile("./users.json",data,function(err){
      console.log(data) ;
      res.end(data) ;
   }) ;

})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
