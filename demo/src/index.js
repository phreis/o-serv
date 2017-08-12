/*   var omodel = require('../../src/o-model.js'); */
import omodel from '../../src/o-model.js';
/* var oreq = require('../../src/o-req.js');
  oreq.fetch("/V3/Northwind/Northwind.svc/").subscribe({
  next: res => {  document.getElementById("demo").innerText = res;   },
  error: err => {  document.getElementById("demo").innerText = err;   } 

}); */
var mod = omodel.mySingleton.getInstance("/V3/Northwind/Northwind.svc/");
mod.getEntitySkipTop('Products','0','10').subscribe({
  next: res => {  document.getElementById("demo").innerText = res;   },
  error: err => {  document.getElementById("demo").innerText = err;   } 

});
