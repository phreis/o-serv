
//import { OService, OModel, OHeader  } from 'o-serv';
import { OService, OModel, OHeader, OHttp } from '../../src/main';
var NPLAuthHeader: OHeader[] = [
  {
    key: "Authorization",
    value: "Basic REVWRUxPUEVSOmJ1c2luZXN"
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
      Object.keys(res).forEach(key => {
        Object.keys(res[key]).forEach(fieldname => {console.log(fieldname+' : '+res[key][fieldname]);})
      })
    },
    error: err => { document.getElementById("demo").innerText = err; }
  });
//model.getMetadata().subscribe( res => { console.log(res) });



