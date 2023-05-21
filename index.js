const express = require("express");
const path = require("path");
const exphbs=require('express-handlebars');
const logger = require("./middleware/logger.js");
const members=require("./Members.js");

const PORT = process.env.PORT || 5000;

const app = express();

//init middleware
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars',exphbs.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Homepage route
app.get('/',(req,res)=>res.render('index',{
    title:'Members App',
    members
}));

//set a static folder
app.use(express.static(path.join(__dirname, "public")));

//Members api routes
app.use('/api/members',require('./routes/api/members.js'))

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
