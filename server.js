

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/todo-angulariti'));
  app.get('/*', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/todo-angulariti/index.html'));
    });
app.listen(process.env.PORT||3000);