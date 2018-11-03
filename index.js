const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();


//** Set environments variables **//

require('dotenv').config();


//** Set values **//

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST_NAME || '127.0.0.1');
app.set('env', process.env.MODE);


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