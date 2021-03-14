

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/Todo'));
  app.get('/*', function(req,res) {
    
    res.sendFile(path.join(__dirname+'dist/Todo/index.html'));
    });
app.listen(process.env.PORT||3000);