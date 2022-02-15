const express = require('express');

const app = express();
const HTTP_PORT = 3000;

// testing server 
app.get('/test', (req, res) => {
    res.status(200).json({ success: true });
})

//checking the srerver for listening on port 3000
app.listen(HTTP_PORT, () => console.log("Server is listening on port " + HTTP_PORT));