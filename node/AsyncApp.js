var fs = require('fs');
fs.readFile('./apples.txt','utf8', function(err,data) {
    if(err) {
        console.log(err);
    } else {

        var adjData = data.replace(/apple/g,'orange');

        fs.writeFile('./orange.txt', adjData, function(err) {
            if (err) console.log(err);
        });
    }
});