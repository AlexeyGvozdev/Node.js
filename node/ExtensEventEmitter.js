"use strict"

var util = require("util");
var eventEmitter = require("events").EventEmitter;
var fs = require("fs");

function InputChecker (name, file) {
    this.name = name;
    this.writeStream = fs.createWriteStream("./" + file + ".txt", 
        { "flags" : "a",
          "encoding" : "utf8",
          "mode" : 0o666});
}

util.inherits(InputChecker, eventEmitter);

InputChecker.prototype.check = function(input) {

    // Удаление лишних пропусков
    let command = input.trim().substr(0,3);

    //Обработка команд
    //Команда wr: входные данные записываются в файл
    if(command == "wr:") {
        this.emit("write", input.substr(3, input.length));
    //Команда en: процесс завершился
    }else if(command == "en:") {
        this.emit("end");
    //Эхо-вывод в выходной поток
    }else {
        this.emit("echo", input);
    }
};

// Тестирование нового объекта и обработки событий
let ic = new InputChecker("Shelley", "output");

ic.on("write", function(data) {
    this.writeStream.write(data, "utf8");
});

ic.on("echo", function(data) {
    process.stdout.write(ic.name + " wrote " + data);
});

ic.on("end", function(data) {
    process.exit();
});

//Получение ввода после назначения кодировки
process.stdin.setEncoding("utf8");
process.stdin.on("readable", () => {
    let input = process.stdin.read();
    if(input !== null) ic.check(input);
});