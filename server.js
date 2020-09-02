const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const routes = require('./routes.js');

app.use(express.json());
app.use(express.static(__dirname + '/src'));
app.use('/api', routes);


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

app.listen(process.env.PORT || '8080', () => console.log('Server is running on port 8080'))
