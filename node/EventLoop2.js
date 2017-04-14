var interval = setInterval(function(name) {
    console.log("Hello " + name);
}, 3000,"Shelley");

setInterval(function(interval) {
    clearInterval(interval);
    console.log("cleared timer");
}, 30000, interval);