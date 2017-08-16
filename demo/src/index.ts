import { Model } from './../../src/o-model3';
import { OModel } from './../../src/o-model';

var mod = new OModel("/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/");
mod.getEntitySkipTop('BusinessPartnerSet', '0', '10').subscribe({
  next: res => {
    document.getElementById("demo").innerText = res.toString();//[1].CompanyName
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


