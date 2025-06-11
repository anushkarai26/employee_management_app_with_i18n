const express = require('express');
const path = require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const dbConfig=require('./config/employeedb');
const employeeRoute=require('./routes/controller');

//Connect to Database and on connection and on error
const database = 'mongodb://localhost:27017/empDB';
mongoose.connect(dbConfig.database).then(
   () => { console.log('Database is connected') },
   err => { console.log('There is problem while connecting database: ' + err) }
 );
 
const app = express();

const Employee=require('./model/employeedet');
const User=require('./model/userdet');

var corsOptions={
    origin:"http://localhost:8081"
};


app.use(express.json());

//Body Parser Middleware
app.use(bodyParser.json());

app.use(express.urlencoded({extended:false}));

const session = require('express-session');

//Passport Middleware
app.use(session({
    secret:'yoursecret',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true}
}));
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname,'client')));

//Set Port Number
const PORT = process.env.PORT|| 3000;


app.use('/employees', employeeRoute);

//Set Port Number
const PORT1 = process.env.PORT1|| 4000;


app.use('/users', employeeRoute);


//Index route
app.get('/',(req,res)=>{
    res.json({message:"Welcome to MEAN CRUD application"})
});

//LISTEN FOR REQUESTS
app.listen(PORT ,()=> {
    console.log('Server started on port:' +PORT);
});

//LISTEN FOR REQUESTS
app.listen(PORT1 ,()=> {
    console.log('Server started on port:' +PORT1);
});


module.exports = app;