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
  try {
    const token = await getToken();
    console.log("[apiMedicClient] getSymptoms - Using token:", token ? token.substring(0, 8) + '...' : 'none');
    const res = await axios.get(
      `${API_BASE_URL}/symptoms?token=${token}&language=en-gb`
    );
    console.log("[apiMedicClient] getSymptoms - API call success, count:", Array.isArray(res.data) ? res.data.length : 'N/A');
    return res.data;
  } catch (err) {
    console.error("[apiMedicClient] getSymptoms - API call error:", err);
    throw err;
  }
}

async function getDiagnosis(symptomsArray) {
  try {
    const token = await getToken();
    console.log("[apiMedicClient] getDiagnosis - Using token:", token ? token.substring(0, 8) + '...' : 'none');
    console.log("[apiMedicClient] getDiagnosis - Symptoms array:", symptomsArray);
    const res = await axios.get(
      `${API_BASE_URL}/diagnosis?token=${token}` +
        `&language=en-gb&symptoms=${encodeURIComponent(
          JSON.stringify(symptomsArray)
        )}&gender=male&year_of_birth=1990`
    );
    console.log("[apiMedicClient] getDiagnosis - API call success, count:", Array.isArray(res.data) ? res.data.length : 'N/A');
    return res.data;
  } catch (err) {
    console.error("[apiMedicClient] getDiagnosis - API call error:", err);
    throw err;
  }
}

module.exports = { getSymptoms, getDiagnosis };
