var buf1 = new Buffer("this is the way we build our buffer");
var lnth = buf1.length;

// Создание нового буффера как среза старого
var buf2 = buf1.slice(19, lnth);
console.log(buf2.toString()); // build our buffer

// Изменение второго буффера
buf2.fill("*",0,5);
console.log(buf2.toString()); // ***** our buffer

// Проверка содержимого первого буффера
console.log(buf1.toString()); // this is the way we ***** our buffer

if (buf1.equals(buf2)) console.log("buffers are equal");