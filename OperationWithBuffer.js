var buf = new Buffer(4);

//Запись в буфер
buf.writeUInt8(0x63,0);
buf.writeUInt8(0x66,1);
buf.writeUInt8(0x74,2);
buf.writeUInt8(0x71,3);

console.log(buf.toString());