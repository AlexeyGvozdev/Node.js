var http = require('http'),
    fs = require('fs'),
    base = '\.',
    mime = require('mime');

http.createServer(function(req, res) {
    var pathname = base + req.url;
    var type = mime.lookup(pathname);
    console.log(pathname);

    fs.stat(pathname, function(err, stats) {
        if (err) {
            console.log(err);
            res.writeHead(404);
            res.write('Resource mossing 404\n');
            res.end();
        } else {
            res.setHeader('Content-Type', type);

            // Создание и перенаправление потока для чтения
            var file = fs.createReadStream(pathname);

            file.on('open', function() {
                res.statusCode = 200;
                file.pipe(res);
            }); 
            file.on('error', function(err){
                console.log(err);
                res.writeHead(403);
                res.write('file missing or permission problem');
                res.end();
            });
        }
    });
}).listen(8124);

console.log('Server running at 8124');