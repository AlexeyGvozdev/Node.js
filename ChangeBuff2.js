var buf1 = new Buffer("this is a buffer with a string");

// Копирование буффера
var buf2 = new Buffer(10);
buf1.copy(buf2);

console.log(buf2.toString()); // this is a