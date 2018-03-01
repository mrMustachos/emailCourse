var http = require("https");
const keys = require('./config/keys');
const request = require("request");
const axios = require("axios");

// var options = {
//   "method": "GET",
//   "hostname": "api.phish.net",
//   "port": null,
//   "path": '/v3/setlists/latest?apikey=DDCD0D63DF40D9B8FE29',
//   "headers": {}
// };

// var req = http.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.end();



// module.exports = (app) => {
//   app.get('/external-api', function(req, res, next) {
//     request({
//       uri: 'https://api.phish.net/external-api/v3/setlists/latest',
//       qs: {
//         apikey: keys.phishKey
//       },
//       function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//           console.log(body);
//           res.json(body);
//         } else {
//           res.json(error);
//         }
//       }
//     });
//   });
// };




const url = `https://api.phish.net/external-api/v3/setlists/latest?apikey=${keys.phishKey}`;

axios
  .get(url)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });