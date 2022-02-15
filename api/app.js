const express = require('express');
const fetch   = require('node-fetch');
const date    = require('date-and-time');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const HTTP_PORT = 3000;
const dbFile = './weatherData.db';

let db = new sqlite3.Database(dbFile, err => {
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

db.run(
    `CREATE TABLE IF NOT EXISTS weather (temprature FLOAT NOT NULL, time timestamp)`
);

app.get('/temprature', async (request, response) => {

     // to open the db after closing
     db = new sqlite3.Database(dbFile, err => {
        if (err) {
            console.log(err.message)
        }
    });
    // checking when the last temprature was pulled
    let currentTemp = {};
    let cachedData = await getData();

    if (!cachedData?.time) {
        currentTemp = await getTemprature();
    }
    else {
        currentTemp = await getData();
    }

    response.json(currentTemp);

    db.close(err => {
        if (err) {
            console.log(err.message);
        }
    });   
});

// querying the data from the Database
var getData = () => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM weather
            WHERE time >= time('now', '-500 minutes')
            ORDER BY time DESC
            LIMIT 1`, (err, row) => {
            if (err) {
                console.log("query error", err.message);
                reject(err);
            }
            else {
                console.log("query success", row);
                resolve(row);
            }

        });
    })
}

// writing the temprature and time stamp into the database
function insertData(higherTemp) {
    console.log("Insert")
    const sql = `INSERT INTO weather (temprature, time) values(?, time())`;

    db.run(
        sql,
        [higherTemp],
        (err) => {
            if (err) return console.error(err.message);

            console.log('A new row has been created');
        }
    );
}

// fetching the data from the metaweather api
getTemprature = async () => {
    console.log("Temprature API")
    const api_url = `https://www.metaweather.com/api/location/2475687`;
    const fetch_response = await fetch(api_url);
    const data = await fetch_response.json();
    // console.log(data.consolidated_weather)

    // get the time stamp
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

    insertData(higherTemp);
    return { "temprature": `${higherTemp}`, "timeStamp": `${val}` };

}