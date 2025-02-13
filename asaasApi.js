const axios = require('axios');
require('dotenv').config();

const ASAAS_API_URL = 'https://api-sandbox.asaas.com/v3';
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

const apiAsaas = axios.create({
  baseURL: ASAAS_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'access_token': ASAAS_API_KEY
  }
});

module.exports = apiAsaas;
