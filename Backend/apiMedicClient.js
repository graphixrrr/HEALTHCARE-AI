const axios = require("axios");
require("dotenv").config();

const { APIMEDIC_USERNAME, APIMEDIC_PASSWORD, APIMEDIC_TOKEN } = process.env;
const AUTH_URL = "https://authservice.priaid.ch/login";
const API_BASE_URL = "https://healthservice.priaid.ch";

let tokenCache = null;
let tokenExpire = 0;

async function getToken() {
  // If user supplied a static token, use it
  if (APIMEDIC_TOKEN) return APIMEDIC_TOKEN;

  const now = Date.now();
  if (tokenCache && now < tokenExpire) {
    return tokenCache;
  }

  const params = new URLSearchParams();
  params.append("username", APIMEDIC_USERNAME);
  params.append("password", APIMEDIC_PASSWORD);

  const response = await axios.post(AUTH_URL, params);
  tokenCache = response.data.Token;
  // tokens are valid ~15 minutes
  tokenExpire = now + 15 * 60 * 1000;
  return tokenCache;
}

async function getSymptoms() {
  const token = await getToken();
  const res = await axios.get(
    `${API_BASE_URL}/symptoms?token=${token}&language=en-gb`
  );
  return res.data;
}

async function getDiagnosis(symptomsArray) {
  const token = await getToken();
  const res = await axios.get(
    `${API_BASE_URL}/diagnosis?token=${token}` +
      `&language=en-gb&symptoms=${encodeURIComponent(
        JSON.stringify(symptomsArray)
      )}&gender=male&year_of_birth=1990`
  );
  return res.data;
}

module.exports = { getSymptoms, getDiagnosis };
