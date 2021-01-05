const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.MONGODB_URI || "mongodb+srv://fatture-manager-heroku-app:4sHpgUBSERGEQAGn@cluster0.wnfye.mongodb.net/codigital-DB?retryWrites=true&w=majority";

MongoClient.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(client =>{
  console.log("Succesfully connected to DB!")
  app.use(express.json()); // for parsing application/json

  const fattureCollection = client.db("codigital-DB").collection("fatture");

  const port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log('listening on port ' + port);
  })

  fattureCollection.find().toArray()
  .then(fatture => {
    console.log("Succesfully connected to collection ''fatture''!")
    app.use(express.static(__dirname + '/dist/fatture-manager'));

    //GET
    app.get('/fatture', (req, res) => {
      res.send(fatture);
    });

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname+'/dist/fatture-manager/index.html'));
    });

    //POST
    app.post('/fatture', (req, res) => {
      console.log(req)

      if (req.body.nome && req.body.prezzo) {
        prodottiCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))
      }

      res.send(req.body)
    });

    //PUT

    //DELETE

  })



})
.catch(err=>{
  console.log(`db error ${err.message}`);
  process.exit(-1)
});
