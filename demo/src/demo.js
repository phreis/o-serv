  var oreq = require('../../src/o-req.js');
  oreq.fetch("/V3/Northwind/Northwind.svc/").subscribe({
  next: res => { document.getElementById("demo").innerText = res;  },
  error: err => { document.getElementById("demo").innerText = err;  } 

});
//oreq.echo("Hallo!sfsdfsdf!");

//document.getElementById("demo").innerHTML = 'Hallo!!';
document.title = "Demoprogramm!!";