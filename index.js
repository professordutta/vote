const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/graph',(req,res)=>{
    res.sendFile(__dirname+'/charts.html');
});

app.get('/fetchdata',(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("feedback");
        dbo.collection("mall").findOne({}, function(err, result) {
          if (err) throw err;
          console.log(result.a);
          console.log(result.b);
          console.log(result.c);
          console.log(result.d);
          res.send(result);
          db.close();
        });
      });
});

app.post('/update',(req,res)=>{

MongoClient.connect(url, function(err, db) {
    let v1, v2, v3, v4, v5;
    if (err) throw err;
    var dbo = db.db("feedback");
    // read the db values
    dbo.collection("mall").findOne({}, function(err, result) {
        if (err) throw err;
         console.log(result._id)
         v1 = result.a;
         v2 = result.b;
         v3 = result.c;
         v4 = result.d; 
         v5 = result._id;
        //  console.log(v5,'Hello dear');
        if(req.body.radiobtn=="a"){
            // increment in db a by 1 and update
            console.log('I am here...');
            v1 = v1+1;
        }       
        if(req.body.radiobtn=="b"){
            //increment in db b by 1 and update
            v2 = v2+1;
        }       
        if(req.body.radiobtn=="c"){
            //increment in db c by 1 and update
            v3 = v3+1;
        }    
        if(req.body.radiobtn=="d"){
            //increment in db d by 1 and update
            v4 = v4+1;
        }
        console.log(v5);
        var newvalues = { $set:{ a: v1, b: v2, c:v3, d:v4 } };
        var myquery = { _id: v5 };
        dbo.collection("mall").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });      
  });
});

app.get('/vote',(req,res)=>{
res.sendFile(__dirname+'/vote.html');
});

app.listen(3000,function(){
    console.log('Listening to port 3000...');
})