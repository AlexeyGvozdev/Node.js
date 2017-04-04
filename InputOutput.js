process.stdin.setEncoding("utf-8");

process.stdin.on("readable", function() {
    var input = process.stdin.read();

    if (input !== null) {
        // Эхо-вывод текста
        process.stdout.write(input);
        var comand = input.trim();
        if (comand == "exit") {
            process.exit();
        }
    }
});