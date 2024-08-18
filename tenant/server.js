const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || "3101";
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/create-tenant', (req, res) => {
    const formData = req.body;

    axios.post(`${process.env.API_BASE_URL}/tenantApiStoreTenant`, formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Erro ao criar tenant.' });
    });
});

app.listen(3101, () => {
    console.log(`Server started on port: ${port}`);
});
