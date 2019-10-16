import * as express from 'express';
import { Server } from 'http';
const fetch = require("node-fetch");



export class ContributorPercentageCalculator {
  private app: express.Express;
  private server: Server;

  constructor() {
    this.app = express();

    this.app.get('/contributorPercentage', (req, res, next) => {
      const date = req.query.date;

      function filter(d) { return d.date === date; }

      fetch('http://vitally-test.herokuapp.com/events')
      .then((response:Response) => response.json())
      .then((data:Array<any>) => {
          res.json(data.filter(filter));
      });
    });
  }

  listen(port: number, callback?: (...args: Array<any>) => void) {
    this.server = this.app.listen(port, callback);
  }

  close() {
    this.server.close();
  }
}
