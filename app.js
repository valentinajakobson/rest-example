const express = require('express'); //node function
const app = express();

app.use(express.json());

const db = require('./db')
const baseURL = '/api/v1'
const router = express.Router()

app.use(baseURL, router)

router.get('/pois', (req, res) => {
  res.status(200).send(db.getPoi())
});


router.get('/pois/:id', (req, res) => {
  if (db.getPoi(req.params.id)) {
    res.status(200).send(db.getPoi(req.params.id))
  } else {
    res.status(400).end('ID not found')
  }
});

router.post('/pois', (req, res) => {
  let check = true
  for (const key in req.body) {
    if (req.body[key] == "") {
      check = false
    }
  }
  if (check){
    let poi = req.body
    db.createPoi(poi)
    res.status(201).send(poi)
  } else {
  res.status(400).send('Invalid or missing POI data')
}
});



router.put('/pois/:id', (req, res) => {
  const id = req.params.id
  let check = true
  for (const key in req.body) {
    if (req.body[key] == "") {
      check = false
    }
  }
  console.log(check);
  if (check === true) {
    if (db.getPoi(id)) {
      res.status(200).send(db.setPoi(id, req.body))
    } else {
      res.status(201).send(db.setPoi(id, req.body))
    }
  } else {
    res.status(400).send('Invalid or missing POI data')
  }
});


router.delete('/pois/:id', (req, res) => {
  console.log(db.getPoi(req.params.id));
  if (req.params.id && db.getPoi(req.params.id)) {
    res.status(204).send(db.deletePoi(req.params.id))
  } else {
    res.status(404).send('ID not found')
  }
});


app.listen(3000, () => console.log('Server ready'));
