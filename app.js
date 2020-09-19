const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();    
  });


  const ONE_HOUR = 1000 * 60 * 60;
 
   ses_name = 'rms',
   ses_secrete = '1234',
   ses_lifetime = ONE_HOUR
    
   app.use(session({
  name:ses_name,
  resave:false,
  saveUninitialized:false,
  secret:ses_secrete,
  cookie:{
      maxAge:ses_lifetime,
      sameSite:true
  }

}))

const redirectLogin = (req,res,next)=>{

  if(!req.session.sesId){ 
   res.redirect('/lordlogin')
  }else{
    next()
  }
}
const redirectHome = (req,res,next)=>{

  if(req.session.sesId){ 
   res.redirect('/addlord')
  }else{
    next()
  }
}

app.get('/',(req,res)=>{
 
  
  console.log(req.session.userID);

  
})
// api routes/

 app.use('/', require('./routes/landlord'));
 app.use('/', require('./routes/student'));
 app.use('/picUploads',express.static('picUploads'));
 app.use('/uploadpic',express.static('uploadpic'));
 app.use('/', require('./routes/admin'));
 

 // start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 9000;
const server = app.listen(port, function () {
                          console.log('Server listening on port ' + port);
                             });

