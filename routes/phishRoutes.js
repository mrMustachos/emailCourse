const _ = require('lodash');
// const Path = require('path-parser');
// const { URL } = require('url');
// const requireCredits = require('../services/requireCredits');
// const keys = require('../config/keys');
const requireLogin = require('../services/requireLogin');
const generateSetlist = require('../services/setProcessing/generateSetlist');
const setlistDataCleaner = require('../services/setProcessing/setlistDataCleaner');
const options = require('../services/setProcessing/optionsCreater');
const requestP = require('request-promise-native');


module.exports = (app) => {
  app.get('/phishnet/setlist', requireLogin, async (req, res) => {
    const setlistPromise = requestP(options('/setlists/get', { showdate: '2017-08-06' }));
    const jamchartPromise = requestP(options('/jamcharts/all'));
    
    const [setlist, jamchart] = await Promise.all([setlistPromise, jamchartPromise]);
    const cleaned = await setlistDataCleaner(setlist.response.data[0], jamchart.response.data);
    res.send(cleaned);
  });
};



module.exports = (app) => {
  app.get('/phishnet/test', requireLogin, generateSetlist, async (req, res) => {
    const base = req.res.locals.base;
    const jamId = base.jam_id;
    var jamDeets = [];

    for (var i = 0; i < jamId.length; ++i) {
      jamDeets.push(requestP(options('/jamcharts/get', { songid: jamId[i] })));
    }
    const test = await Promise.all(jamDeets);

    res.send(base);
  });
};








// gets href's          = /(?<=href=[\'\"])([^\'\"]+)/g
// gets transition type = /(?<=href=[\'\"])([^\'\"]+)/g

// everything but song divider (not sup) = /<[a|sup](.*?)href=("|')(.*?)("|') class='setlist-song'>(.*?)</a>/g
// select song dividers = />[\s,|>]+</g

// get sup tag = /<[sup](.*?)>(.*?)</sup>/g

