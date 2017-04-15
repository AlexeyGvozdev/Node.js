var http = require('http'),
    fs = require('fs'),
    base = '\.';

http.createServer(function(req, res) {
    pathname = base + req.url;
    console.log(pathname);

    fs.stat(pathname, function(err, stats) {
        if (err) {
            console.log(err);
            res.writeHead(404);
            res.write('Resource mossing 404\n');
            res.end();
        } else {
            res.setHeader('Content-Type', 'text/html');

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