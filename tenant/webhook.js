require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const tenants = new Map();

app.post('/webhook/:platform', (req, res) => {
    const platform = req.params.platform;
    const paymentStatus = req.body.paymentStatus;
    const tenantIdentity = req.body.identity;

    if (paymentStatus === 'paid') {
        tenants.set(tenantIdentity, true);
    } else {
        tenants.set(tenantIdentity, false);
    }

    axios.post(`${process.env.API_BASE_URL}/tenantApiUpdateTenant`, {
        status: paymentStatus === 'paid' ? 'active' : 'inactive',
        identity: tenantIdentity
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
    })
    .then(response => {
        res.status(200).send('Tenant status updated successfully.');
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Error updating tenant status.');
    });
});

app.listen(3101, () => {
    console.log('Webhook server is running on port 3101');
});
