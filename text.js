




var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=RUB';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(  Math.round( response.result * 5 ) / 10 );
  document.getElementById('bottom_text').innerHTML = ( Math.round( response.result * 5 ) / 10 ) + " рублей";
}
