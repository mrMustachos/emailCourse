const _ = require('lodash');
const keys = require('../config/keys');
const requestP = require('request-promise-native');
const setCleaner = require('../services/setCleaner');


const options = (url, qs) => {
  qs = qs || {};
  var obj = {
    uri: `https://api.phish.net/v3${url}`,
    qs: { apikey: keys.phishKey },
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  }
  _.assign(obj.qs, qs);

  return obj;
};

exports.collectSetData = async (req, res, next) => {
  const setlistPromise = requestP(options('/setlists/get', { showdate: '2017-08-06' }));
  const jamchartPromise = requestP(options('/jamcharts/all'));
  
  const [setlist, jamchart] = await Promise.all([setlistPromise, jamchartPromise]);
  const baseData = await setCleaner(setlist.response.data[0], jamchart.response.data);

  res.locals.baseData = baseData;
  next();
};

exports.generateSetlist = async (req, res) => {
  const baseData = req.res.locals.baseData;
  const jamId = baseData.jam_id;
  var jamDeets = [];

  for (var i = 0; i < jamId.length; ++i) {
    jamDeets.push(requestP(options('/jamcharts/get', { songid: jamId[i] })));
  }
  const test = await Promise.all(jamDeets);

  res.send(baseData);
};





// gets href's          = /(?<=href=[\'\"])([^\'\"]+)/g
// gets transition type = /(?<=href=[\'\"])([^\'\"]+)/g

// everything but song divider (not sup) = /<[a|sup](.*?)href=("|')(.*?)("|') class='setlist-song'>(.*?)</a>/g
// select song dividers = />[\s,|>]+</g

// get sup tag = /<[sup](.*?)>(.*?)</sup>/g
