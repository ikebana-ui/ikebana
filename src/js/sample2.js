var http = require('http');

var server = http.createServer(function(request,response) {
	var url = require('url').parse(request.url,true);
	var n1 = parseFloat(url.query['n1']);
	var n2 = parseFloat(url.query['n2']);
	var result = getResult(url.pathname,n1,n2).toString();
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write('<html>');
	response.write(result);
	response.write('</html>');
	response.end();
});
server.listen(8124);

function getResult(action,num1,num2){
	switch(action){
		case '/': 	return "HeLLo!!!";
		case '/add':
					return num1+num2;
		case '/multiply':
					return num1*num2;	
		case '/divide':
					return num1/num2;
		case '/subtract':
					return num1-num2;	
		default:
					return "Not A Valid Input!!!";					
	}
}