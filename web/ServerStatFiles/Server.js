var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    mime = require('mime');

var base = '.';

http.createServer(function(req, res) {
    var pathname = path.normalize(base + req.url);
    console.log(pathname);

    fs.stat(pathname, function(err, stats) {
        if (err) {
            console.log(err);
            res.writeHead(404);
            res.write('Resource mossing 404\n');
            res.end();
        } else if(stats.isFile()){
            // тип контента
            var type = mime.lookup(pathname);
            console.log(type);
            res.setHeader('Content-Type', type);
            
            // Создание и перенаправление потока для чтения
            var file = fs.createReadStream(pathname);
            file.on('open', function() {
                res.statusCode = 200;
                file.pipe(res);
            }); 
            file.on('error', function(err){
                console.log(err);
                res.statusCode = 403;
                res.write('file permission');
                res.end();
            });
        } else {
            res.writeHead(403);
            res.write('Directory access is forbidden');
            res.end();
        }
    });
}).listen(8124);

console.log('Server running at 8124');