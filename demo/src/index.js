/*   var omodel = require('../../src/o-model.js'); */
import { mySingleton } from '../../src/o-model.js';
import { Model } from '../../src/o-model2.js';
/* var oreq = require('../../src/o-req.js');
  oreq.fetch("/V3/Northwind/Northwind.svc/").subscribe({
  next: res => {  document.getElementById("demo").innerText = res;   },
  error: err => {  document.getElementById("demo").innerText = err;   } 

}); */
//var mod = omodel.mySingleton.getInstance("/V3/Northwind/Northwind.svc/");

var mod = mySingleton().getInstance("/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/");
mod.getEntitySkipTop('BusinessPartnerSet', '0', '10').subscribe({
  next: res => {
    document.getElementById("demo").innerText = res//[1].CompanyName
    ;
  },
  error: err => { document.getElementById("demo").innerText = err; }
});
/* mod.getTransmissionState().subscribe({
  next: state => {
    document.getElementById("monitor").innerText = state
    ;
  }
}) */
var mymodel = new Model("hello");
mymodel.url = "hugo";
mymodel.sayhi();

