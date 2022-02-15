const express = require('express');
const fetch   = require('node-fetch');

const app = express();
const HTTP_PORT = 3000;

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
    // console.log(data.consolidated_weather)

    response.json(data);
});