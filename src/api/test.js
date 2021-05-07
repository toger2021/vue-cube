const request = require('request')
var qs=require( 'querystring' );
// import request from '@/utils/request'
/*
 application/json (JSON表单)
*/
const url='http://123.57.141.209:9999'
let reqcookies=''

request({
  url: url+'/PropertyManagement/Web/Log/Login',
  method: "POST",
  json: true,
  headers: {
      "content-type": "application/json",
  },
  body: {
    'LoginCode': 'aiqingwuye',
    'Pwd': 'aq123'
  }
}, function(error, response, body) {
  // ...

  reqcookies= response.headers['set-cookie'][0]


})


reqcookies='ASP.NET_SessionId=fmwy0kjc2r23dkp00naok150; LoginExcelSQL=ICBhbmQgQ29tbUlEID0gNjAwODAzICBBbmQgSXNBdWRpdCA9IDAgIGFuZCAgIChXYWl2SUQgaW4gKHNlbGVjdCBXYWl2SUQgZnJvbSBQTVNfQmFzZS4uVGJfSFNQUl9XYWl2ZXJzRmVlQXVkaXRpbmcgYXMgYSBpbm5lciBqb2luICAoIHNlbGVjdCBTeXNSb2xlQ29kZSBmcm9tIFBNU19CYXNlLi52aWV3X1N5c19Vc2VyUm9sZV9GaWx0ZXIgd2hlcmUgdXNlcmNvZGU9JzAwMDAwMScpIGFzIGIgb24gYS5Sb2xlQ29kZSA9IGIuU3lzUm9sZUNvZGUgZ3JvdXAgYnkgV2FpdklEKSkgICA='
  console.log('reqcookies', reqcookies)
const reqdata={draw:3, length:10}
var content=qs.stringify(reqdata);
content='draw=2&columns%5B0%5D%5Bdata%5D=BussName&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=BussType&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=BussNature&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=Province&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=City&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=Area&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=BussLinkMan&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=BussMobileTel&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=RegDate&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=IsClose&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=true&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B10%5D%5Bdata%5D=&columns%5B10%5D%5Bname%5D=&columns%5B10%5D%5Bsearchable%5D=true&columns%5B10%5D%5Borderable%5D=true&columns%5B10%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B10%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&BussName=&Province=&ProvinceText=&BussType=&City=&CityText=&IsClose=&Area=&AreaText=&StartDate=&EndDate='
// var options = {
//   host: '123.57.141.209',
//   port: 9999,
//   path: '/PropertyManagement/Web/Relation/GetRelationList' ,

//   // path: '/PropertyManagement/Web/BusinessCorp/GetBusinessCorpList' ,

//   method: 'POST' ,
//   headers:{
//   'Content-Type' : 'application/x-www-form-urlencoded' ,
//   'Content-Length' :content.length,
//   'X-Requested-With': 'XMLHttpRequest',
//   Cookie: reqcookies
//   }
// };
// console.log( "post options:\n" ,options);
// console.log( "content:" ,content);
// console.log( "\n" );
// var http=require( 'http' );
// var req = http.request(options, function (res) {
//   console.log( "statusCode: " , res.statusCode);
//   console.log( "headers: " , res.headers);
//   var _data= '' ;
//   res.on( 'data' , function (chunk){
//      _data += chunk;
//   });
//   res.on( 'end' , function (){
//      console.log( "\n--->>\nresult:" ,_data)
//    });
// });

// req.write(content);
// req.end();


  // request({
  //   url: url+'/PropertyManagement/Web/Relation/GetRelationList',
  //   method: "POST",
  //   json: true,
  //   // type:'text',
  //   headers: {
  //       "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  //       Cookie: reqcookies
  //   },
  //   form: {
  //     // 'draw': '2',
  //     // 'start':'0',
  //     'length':'10'
  //   },
  //   body: content

  // }, function(error, response, body) {
  //   // ...
  //   console.log('body', body)
  // })


  request.post({
    url: url+'/PropertyManagement/Web/Relation/GetRelationList',
    json:true,
    form: {
      'draw': '2',
      'start':'0',
      'length':'10'
    },
    headers: {
            // "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            Cookie: reqcookies
        },
    },
    (err, res, body) => {
    console.log(body)
    })



