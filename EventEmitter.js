var eventEmitter = require("events").EventEmitter;
var counter = 0;

var em = new eventEmitter();
// создание события em.emit("timed", counter++)
setInterval(() => { em.emit("timed", counter++); }, 1000);

// Перехват и обработка события
em.on("timed", (data) => {
    console.log("timed " + data);
    if(data === 4) process.exit(0);
})
console.log("hey")