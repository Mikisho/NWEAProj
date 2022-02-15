const express = require('express');
const fetch   = require('node-fetch');
const date    = require('date-and-time');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const HTTP_PORT = 3000;
const dbFile = './weatherData.db';

const db = new sqlite3.Database(dbFile, err => {
    if(err) {
        console.log(err.message)
    }
    console.log('connected to weatherData.db in sqlite');
});

// testing server 
app.get('/test', (req, res) => {
    res.status(200).json({ success: true });
})

//checking the srerver for listening on port 3000
app.listen(HTTP_PORT, () => console.log("Server is listening on port " + HTTP_PORT));

app.get('/temprature', async (request, response) => {
    const api_url = `https://www.metaweather.com/api/location/2475687`
    const fetch_response = await fetch(api_url);
    const data = await fetch_response.json();
     // get the time stamp
    // const timestamp = data.time
    const timeStamp = new Date();
    data.timeStamp = timeStamp;

    // formatting the date and time
    const val = date.format(timeStamp, 'YYYY/MM/DD HH:MM:ss');

    // According to the API the higher the number
    // the more accurate the temprature

    // Sorting weather data based on temprature
    const sortedTemp = data.consolidated_weather
    const higherTemp = sortedTemp.sort((a, b) => {
        return parseFloat(b['the_temp']) - parseFloat(a['the_temp']);
    })[0]['the_temp'];
    
    response.json({ "temprature": `${higherTemp}`, "timeStamp": `${val}` });

    db.run(
        `CREATE TABLE IF NOT EXISTS weather (temprature FLOAT NOT NULL, time timestamp)`
     );
 
     db.run(
         `SELECT temprature, time FROM weather
          WHERE time >= time('now', '-5 minutes')
          ORDER BY time DESC
          LIMIT 1`
     );
 
     const sql = `INSERT INTO weather (temprature, time) values(?, ?)`;

     db.run(
         sql,
         [higherTemp, val],
         (err) => {
             if (err) return console.error(err.message);

             console.log('A new row has been created');
         }
     );

     db.close(err => {
        if(err) {
            console.log(err.message);
        }
    });
});