var oreq = require('./o-req.js');
require('rxjs/add/operator/map');

export class Model {
constructor(url) {
    this.url = url;
}
    sayhi() {
        console.log(this.url);
    }




};