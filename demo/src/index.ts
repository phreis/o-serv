import { Model } from './../../src/o-model3';
import { OModel } from './../../src/o-model';
var mod1 = new OModel("/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/");
var mod2 = new OModel("/V3/Northwind/Northwind.svc/");
/* mod1.getEntitySkipTop('BusinessPartnerSet', '0', '10').subscribe({
  next: res => {
    document.getElementById("demo").innerText = res.toString();//[1].CompanyName
    ;
  },
  error: err => { document.getElementById("demo").innerText = err; }
}); */
mod2.getEntitySkipTop('Products', '0', '10').subscribe({
  next: res => {
    document.getElementById("demo").innerText = res.toString();//[1].CompanyName
    ;
  },
  error: err => { document.getElementById("demo").innerText = err; }
});


