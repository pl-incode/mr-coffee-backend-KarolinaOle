
const express = require('express');
const bodyParser = require('body-parser');
const myData = require('./data');
const app = express();
const sha256 = require('js-sha256');
const mustacheExpress = require('mustache-express');

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'walmart',
    password: '',
    port: 5432,
  })
  
app.get('/', (req, res, next) => {              
    res.render('Welcome', {'Welcome': 'Welcome on our website'});
  });

app
  .route('/users')
  .get((req, res, next) => {
    const usersNumber = [...myData.users];                  
      for (let i=0; i<usersNumber.length; i++) {
          usersNumber[i].id = i;                     
    }
    res.render('users', {'Title': 'List of users', 'user': usersNumber,
  })
})
  .post((req, res) => {
    res.json(req.body)
    myData.users.push(req.body)
    res.redirect('/users/$(users/lenght-1)}')
  })

  app
  .route('/users/new')
  .get((req, res, next) => {
    res.render('newUser', {});
  });


app
  .route('/schedules')
  .get((req, res, next) => {                                 
    res.render('schedules', {
      'Title': 'List of schedules',
      'schedule': myData.schedules,
    })
  })
  .post((req, res) => {
    res.json(req.body)
    myData.schedules.push(req.body)
  })

app
  .route('/users/:id')
  .get((req, res, next) => {
    const idNumber = req.params.id;
    idNumber >= myData.users.length ? res.render('user', {'Title':'No such user'}) : res.render('user', {'Title': `User ${idNumber}`, 'user': myData.users[idNumber]});
  });

app
  .route('/users/:id/schedules')
  .get((req, res, next) => {
    const idNumber = req.params.id;
    if (idNumber >= myData.users.length){
      res.render('schedule', {'Title': 'No such user'});
      return;}
    const arr=[];
    for ( let i = 0; i < myData.schedules.length; i ++){
      if (idNumber==myData.schedules[i].user_id){
        arr.push(myData.schedules[i]);
      }
    }
    if (arr.length<1) {
      res.render('schedule', {'Title': 'Make an appointemnt'});
      return;
    }
    res.render('schedule', {'Title': `User ${idNumber} schedule`, 'schedule': arr });
  });

  app
    .route('/schedules/new')
    .get((req, res, next) => {
      res.render('newSchedule', {});
    });

 
app.listen(2000, () => {
  console.log(`http://localhost:3000/ is waiting for requests.`);
});
