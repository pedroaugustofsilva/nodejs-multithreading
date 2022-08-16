const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const { Worker } = require("worker_threads");

const THREAD_COUNT = 4;

function createWorker() {
  return new Promise(function (resolve, reject) {
    const worker = new Worker('./four_workers.js', {
      workerData: { thread_count: THREAD_COUNT }
    })

    worker.on("message", (data) => {
      resolve(data);
    });
    worker.on("error", (msg) => {
      reject(`An error ocurred: ${msg}`);
    });
  })
}

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
  const workerPromises = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const results = await Promise.all(workerPromises)
  const total = results.reduce((result, _total) => result + _total, 0)

  res.status(200).send(`The total is ${total}`)
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
