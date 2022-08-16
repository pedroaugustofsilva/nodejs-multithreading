const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const { Worker } = require("worker_threads");


app.get('/hello', (req, res) => {
  res.status(200).send('Hello!')
})

app.get('/blocking', (req, res) => {
  let counter = 0;

  for (let i = 0; i < 20_000_000_000; i++) {
    counter++;
  }

  res.status(200).send(`The total is ${counter}`)
})


app.get("/non-blocking", async (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`result is ${data}`);
  });

  worker.on("error", (msg) => {
    res.status(404).send(`An error occurred: ${msg}`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
