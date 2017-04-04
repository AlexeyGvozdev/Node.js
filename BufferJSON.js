"use stric";

let buf = new Buffer("This is my pretty example");
let json = JSON.stringify(buf);

let buf2 = new Buffer(JSON.parse(json).data);

console.log(buf.toString());

