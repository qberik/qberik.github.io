




var requestURL = 'https://open.er-api.com/v6/latest/USD';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(  Math.round( response.rates.RUB * 5 ) / 10 );
  document.getElementById('bottom_text').innerHTML = "уже " + ( Math.round( response.rates.RUB * 5 ) / 10 ) + " рублей";
}
