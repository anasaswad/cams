const DigestClient = require('digest-client');
const express = require('express');
const bodyParser = require("body-parser");

const restClient = new DigestClient({username: 'api', password: '9eDVkHe369473cN', https: false});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080, () => console.log('Example app listening on port 8080!'));

app.get('/cams', (req, res) => {
  restClient.request({
      host: 'streaming.alaan.tv',
      path: '/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/lowlatency/instances',
      port: 8087,
      method: 'GET',
      headers: { "Content-Type": "application/json; charset=utf-8", "Accept": "application/json; charset=utf-8" }
  }, (err, result) => {
      if (err) {
          res.status(400).send(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
  });
});
