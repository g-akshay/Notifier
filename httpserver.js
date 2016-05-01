var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.use('/', express.static(__dirname + '/'));
/*app.get('/', function(req, res) {
    app.use('/', express.static(__dirname + '/'));
    res.sendFile(path.join(__dirname + '/main.html'));
});
*/

app.listen(8080);
