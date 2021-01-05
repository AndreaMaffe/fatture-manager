const express = require('express');
const path = require('path');
const app = express();
const MongoDB =  require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.MONGODB_URI || "mongodb+srv://fatture-manager-heroku-app:4sHpgUBSERGEQAGn@cluster0.wnfye.mongodb.net/codigital-DB?retryWrites=true&w=majority";

MongoClient.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(client =>{
  console.log("Succesfully connected to DB!")
  app.use(express.json()); // for parsing application/json

  const port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log('listening on port ' + port);
  })

  app.use(express.static(__dirname + '/dist/fatture-manager'));

  //GET
  app.get('/fatture', (req, res) => {
    const fattureCollection = client.db("codigital-DB").collection("fatture");
    fattureCollection.find().toArray()
    .then(fatture => {
      res.send(fatture);
    });
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist/fatture-manager/index.html'));
  });

  //POST
  app.post('/fatture', (req, res) => {
    const fattureCollection = client.db("codigital-DB").collection("fatture");
    if (req.body.nomeServizio && req.body.intestatario.nome) {
      fattureCollection.insertOne(req.body)
      .then(result => {
        res.send(result.ops[0]);
      })
      .catch(error => {
        res.send(error);
      })
    }
  });

  //PUT
  app.put('/fatture/:id', (req, res) => {
    const idFattura = req.params.id;
    const fattureCollection = client.db("codigital-DB").collection("fatture");
    if (req.body.nomeServizio && req.body.intestatario.nome) {
      fattureCollection.findOneAndUpdate(
        {_id: new MongoDB.ObjectID(idFattura)},
        {
          $set: {
            nomeServizio: req.body.nomeServizio,
            importo: req.body.importo,
            intestatario: req.body.intestatario,
            dataEmissione: req.body.dataEmissione,
            tipologia: req.body.tipologia
          }
        },
        {
          upsert: true
        }
      )
      .then(result => {
        res.send(result.ops[0]);
      })
      .catch(error => {
        res.send(error);
      })
    }
  });

  //DELETE
  app.delete('/fatture/:id', (req, res) => {
    const idFattura = req.params.id;
    const fattureCollection = client.db("codigital-DB").collection("fatture");
    fattureCollection.deleteOne({_id: new MongoDB.ObjectID(idFattura)})
    .then(result => {
      res.send({_id: idFattura});
    })
    .catch(error => {
      res.send(error);
    })
  });

});


  /*

})
.catch(err=>{
  console.log(`db error ${err.message}`);
  process.exit(-1)
});
*/
