var fs = require('fs'),
    async = require('async'),
    _dir = 'C:/opencv/build/x64/vc11/lib';

var writeStream = fs.createWriteStream('./log.txt', 
    {'flags' : 'a',
     'encoding' : 'utf8',   
     'mode' : 0666});

async.waterfall([
    function readDir (callback) {
        fs.readdir(_dir, function(err, files) {
            callback(err, files);
        });
    },
    function loopFiles(files, callback) {
        files.forEach(function(name) {
            writeStream.write(name + ';', 'utf8', function(err) {
            // callback(err);
            });

        });
    },
    // function checkFile(file, callback) {
    //     fs.stat(_dir + file, function( err, stats) {
    //         callback(err, stats, file);
    //     });
    // },
    // function readData(stats, file, callback) {
    //     if (stats.isFile())
    //         fs.readFile(_dir + file, 'utf8', function(err, data) {
    //             callback(err, file, data);
    //         });
    // },
    // function writeData(file, text, callback) {
    //     fs.writeFile(_dir + file, text, function( err) {
    //         callback(err, file);
    //     });
    // },
    function logChange(name, callback) {
        writeStream.write(name + '\n', 'utf8', function(err) {
            // callback(err);
        });
    }
], function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log('modified files');
    }
});
