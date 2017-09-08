//import { OModel } from './../../src/o-model'; 
import { OService, OModel, OHeader  } from 'o-request';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

var NPLAuthHeader: OHeader[] = [
  {
    key: "Authorization",
    value: "Basic REVWRUxPUEVSOmJ1c2luZXNz"
  },
];

/* const serv = OService.getInstance("/V3/Northwind/Northwind.svc/");
  serv.getModel('Products') */

  const serv = OService.getInstance("/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/", NPLAuthHeader);
const model = serv.getModel('BusinessPartnerSet');
model.getEntitySkipTop('0', '2')
  .subscribe({
    next: res => {
      document.getElementById("demo").innerText = res[0]['CompanyName']//JSON.stringify(res);//res.toString();//[1].CompanyName

      Object.keys(res).forEach(ent => {
        Object.keys(ent).forEach(key => {

          console.log(ent[key]);
        })
          ;
      })
    },
    error: err => { document.getElementById("demo").innerText = err; }
  });
model.getMetadata().subscribe({ next: res => { document.getElementById("meta").innerText = res.toString(); } });




export class HelloMessage extends React.Component {
  props: any;
  render() {
    return React.createElement(
      "div",
      null,
      "Hello  sdf",
      this.props.name
    );
  }
}

ReactDOM.render(React.createElement(HelloMessage, { name: "Jane" }), document.getElementById('root'));



