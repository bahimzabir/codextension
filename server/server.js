const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8000;


const dict = {
    "السعودية": "SAR",
    "الإمارات العربية المتحدة" : "AED",
    "الكويت" : "KWD",
    "البحرين" : "BHD",
    "قطر" : "QAR",
    "عمان" : "OMR",
    "المغرب" : "MAD",
    "Mali" : "XOF",
    "Côte d'Ivoire" : "XOF"
};

const dict2 = {
    "zx73JLKIqHkvOWIyuMANOxyFWlEp8XZT0R3Uy6MY": "SAR",
    "PjIxH3IFru7HSlEMgjDY0NqIOgUuTudc9Vr44jd0" : "AED",
    "K2HRcpWGXdqs0eMNOiL18UmBKWPyEgbH3GsyjNWL" : "KWD",
    "CfWRwbWLJoMOh4Y8ia3AhPznzbm6NTCd1gpLodNj" : "BHD",
    "VPmZBBZWfBorUkgIyRtVIcRPRr6yTwDipMPU9Cay" : "QAR",
    "YVYK0VJEjPSBsvkSu38uSJMM2WuaJdhkntraA5Lc" : "OMR",
    "UXYicHI6oALEJuMc9EKN5VRtqm5o0YKhp7hpmGQm" : "MAD",
    "Mali" : "XOF",
    "H6mJiKRWQygxWIZkHpruDewEY8MI3JZTiZltbE0Y" : "XOF",
    "BfEJc59ay2092gAWoDrEjxIK5yT1qz4YnJUfPGEo" : "XOF"
};

// this function will return currency conveted value
async function convertCurrency(from, to, amount) {
    var requestURL = `https://api.exchangerate.host/convert?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&amount=${encodeURIComponent(amount)}`;
    try {
        const response = await fetch(requestURL);
        const data = await response.json();
        if(response.ok)  {
            return data;
        } else throw new Error('Error Occured');
    } catch (error) {
        throw new Error(error);
    }
}

// Middleware to add CORS header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/convert', (req, res) => {
  const { from, to, amount } = req.query;
  convertCurrency(dict2[from.trim()], to, amount).then((data) => {
    result = parseFloat(data).toFixed(2);
    res.send(data.result.toString());
    }).catch((error) => {
        console.log(error);
        res.send("NaN");
    })
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


