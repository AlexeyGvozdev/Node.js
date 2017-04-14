var fs = require('fs');
var writeStream = fs.createWriteStream('./log.txt', 
    {flags : 'a',
     encoding : 'utf8',   
     mode : 0666});

writeStream.on('open', function() {

    var counter = 0;

    //Получение списка файлов
    fs.readdir('./data/', function(err, files) {
        // Для каждого файла
        if (err) {
            console.error(err.message);
        } else {
            files.forEach(function(name) {
                fs.stat('./data/' + name, function(err, stats) {

                    if (err) return err;
                    if (!stats.isFile()) {
                        counter++;
                        return;
                    }
                    
                    // Изменение содержимого 
                    fs.readFile('./data/' + name, 'utf8', function(err, data) {

                        if (err) {
                            console.error(err.message);
                        } else {
                            var adjData = data.replace(/somecomany\.com/g, 'burningbird.net');

                            // Запись в файл 
                            fs.writeFile('./data/' + name, adjData, function(err) {
                                if (err) {
                                    console.error(err.message);
                                } else {

                                    // Вывод информации об изменении файла
                                    writeStream.write('change ' + name + '\n', function(err) {
                                        if (err) {
                                            console.error(err.message);
                                        } else {
                                            console.log('finshed ' + name);
                                            counter++;
                                            if (counter >= files.length) {
                                                console.log('all done');
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });

                });
            });
        }
    });
});

writeStream.on('error', function(err) {
    console.error('Error:' + err);
});