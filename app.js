// app.js
// author: Laura Antonescu

const app = require('express')();
const router = require('./routes/api')

app.use('/api', router)
app.listen(3000, () => {
    console.log('Service started on http://localhost:3000');
});

module.exports = app;