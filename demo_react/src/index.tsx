//import { OModel } from './../../src/o-model'; 
import { OService, OModel, OHeader } from 'o-request';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

var NPLAuthHeader: OHeader[] = [
  {
    key: "Authorization",
    value: "Basic REVWRUxPUEVSOmJ1c2luZXNz"
  },
];

OService.getInstance("/V3/Northwind/Northwind.svc/")
  .getModel('Products')
  .getEntitySkipTop('0', '10')
   .subscribe({
    next: res => {
      document.getElementById("demo").innerText = res.toString();//[1].CompanyName
      ;
    },
    error: err => { document.getElementById("demo").innerText = err; }
  });

export class HelloMessage extends React.Component {
  props: any;
  render() {
    return React.createElement(
      "div",
      null,
      "Hello kjh ",
      this.props.name
    );
  }
}

ReactDOM.render(React.createElement(HelloMessage, { name: "Jane" }), document.getElementById('root'));



