var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(
	serveStatic("angularjs")//ścieżka do katalogu
).listen(5000);