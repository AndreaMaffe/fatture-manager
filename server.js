const express = require('express');
const path = require('path');

const app = express();

console.log(process.env.MONGODB_URI),

app.use(express.static(__dirname + '/dist/fatture-manager'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/fatture-manager/index.html'));
});

app.listen(process.env.PORT || 8080);
