const express = require('express');
const bodyParser = require('body-parser');

const librariesRoutes = require('./src/routes/librariesRoutes');

require('dotenv').config(); // Nạp biến môi trường từ .env vào process.env
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/libraries', librariesRoutes);
app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});