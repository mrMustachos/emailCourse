const express = require('express');
const app = express();

// this whole block of code is a route handler 
app.get('/', (req, res) => {
	res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);