var interval = setInterval(function(name) {
    console.log("hello " + name);
}, 3000, "Shelley");
var timer = setTimeout(function(name) {
    clearInterval(interval);
    console.log("cleared timer");
}, 30000, interval);

timer.unref();


console.log("waiting on first interval...");