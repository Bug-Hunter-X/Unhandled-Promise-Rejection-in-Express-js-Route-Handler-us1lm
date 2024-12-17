const express = require('express');
const app = express();
app.get('/', (req, res) => {
  someAsyncOperation()
    .then(() => {
      res.send('Hello World!');
    })
    .catch(err => {
      console.error('Caught error in route handler:', err);
      res.status(500).send('Internal Server Error');
    });
});

async function someAsyncOperation() {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          reject(new Error('Something went wrong!'));
        } else {
          resolve();
        }
      }, 1000);
    });
  } catch (error) {
    console.error('Caught error during async operation:', error);
    throw error; // Re-throw to be caught by the route handler's .catch()
  }
}