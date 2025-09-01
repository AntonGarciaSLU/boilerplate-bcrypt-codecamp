'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const bcrypt     = require('bcrypt');

const app = express();
fccTesting(app);

const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

// START_ASYNC
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) return console.error(err);
  console.log('Async hash:', hash);

  // Compare with correct password
  bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
    if (err) return console.error(err);
    console.log('Async comparison result (correct password):', result); // true
  });

  // Compare with wrong password
  bcrypt.compare(someOtherPlaintextPassword, hash, (err, result) => {
    if (err) return console.error(err);
    console.log('Async comparison result (wrong password):', result); // false
  });
});
// END_ASYNC

// START_SYNC
const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log('Sync hash:', hashSync);

const resultSync = bcrypt.compareSync(myPlaintextPassword, hashSync);
console.log('Sync comparison result (correct password):', resultSync); // true

const wrongResultSync = bcrypt.compareSync(someOtherPlaintextPassword, hashSync);
console.log('Sync comparison result (wrong password):', wrongResultSync); // false
// END_SYNC

// Simple route to see something in the browser
app.get('/', (req, res) => {
  res.send(`
    <h1>Bcrypt Hashing Demo</h1>
    <p>Check the console for hash outputs and comparison results.</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});
