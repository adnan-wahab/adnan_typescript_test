import * as express from 'express';
const fetch = require("node-fetch");
const _ = require("lodash");

function fetchData (date, cb)  {
  function filter(d) { return d.date === date; }

  return fetch('http://vitally-test.herokuapp.com/events')
      .then((response) => response.json())
      .then((data) => {

        let filtered = data.filter(filter)
        console.log(_.countBy(filtered, 'customer'));

        let counts = _.countBy(filtered, (d) => d.user.customer);
        let totalCount = data.length;
        let sum = filtered.length;
         let result = _.map(counts, (count, customer) => {
          let obj = {};
          console.log(counts)
          obj.contributorPercentage = count / totalCount;
          obj.customer = customer;
          return obj;
        })
        console.log(result)
        cb(result);
      })
}

export class Calc {
    constructor() {
        this.app = express();
        this.app.get('/contributorPercentage', (req, res, next) => {
            const date = req.query.date;
            fetchData(date, (data) => { res.json(data)})
        });
    }
    listen(port, callback) {
        this.server = this.app.listen(port, callback);
    }
    close() {
        this.server.close();
    }
}
