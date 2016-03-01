var web_dev = ['python php ruby javascript jsonp perhapsphpisoutdated'];
var rel = /p[^h]/;

var results = [];

web_dev.forEach(function (v,i){
  if(rel.test(v)){
    results.push(v);
  }
});

console.log(results);