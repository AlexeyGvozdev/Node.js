var program = require('commander');

program
    .version('0.0.1')
    .option('-s, --sourse [web site]', 'Sourse web site')
    .option('-f, --file [file name]', 'File name')
    .parse(process.argv);

console.log(program.sourse);
console.log(program.file);
