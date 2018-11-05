const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config.js');

const app = express();


//** Set environments variables **//


//** Set values **//

app.set('port', config.port);
app.set('host', config.host);
app.set('env', config.mode);


//** Database **//
const DB = require('./db/index.js');
DB.connect(app);



//** Middlewares **//

app
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(express.static('public'));


//** Connecting Routes **//

require('./api/index.js')(app);


app.listen(app.get('port'), app.get('host') ,() => console.log('server was running'));