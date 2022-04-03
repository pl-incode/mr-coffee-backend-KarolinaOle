
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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
    database: 'mrcoffee',
    password: '',
    port: 5432,
  })

app.get('/', (req, res, next) => {              
    res.render('Welcome', {'Welcome': 'Welcome on our website'});
  }); 

app.get('/new', (req, res, next) => {
    res.render('newSchedule');
});

app.post('/new', async (req, res, next) => {
    const payload = req.body;
    
    const sql = `INSERT INTO schedules (user_id, day, start_at, end_at) VALUES ('${payload.user_id}', '${payload.day}', 
    '${payload.start_at}', '${payload.end_at}') RETURNING *;`;
    const schedule = await pool.query(sql)

    const sql2 = `SELECT * FROM schedules`;
    const allSchedules = await pool.query(sql2)

    res.json(allSchedules.rows);
})  

const middleWare = (req, res, next) => {
}



app.listen(
    3000,
    () => {
        console.log('http://localhost:3000')
})