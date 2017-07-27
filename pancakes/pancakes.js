'use strict';
var fs = require('fs'),
    filePath = process.argv[2],
    contentLines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(String).slice(1);

contentLines.forEach(function (line, i) {
    let _pancakes = line.replace(/\d/g, '').trim();
    let flips = line.replace(/\D/g, '');
    console.log('Case #' + (i + 1) + ': ' + flipPancakes(_pancakes, parseInt(flips)));
});

function flipPancakes(_pancakes, flips) {
    let pancakes = [];
    for (let i = 0; i < _pancakes.length; i++) {
        if (_pancakes.charAt(i) === '+') {
            pancakes.push(true);
        } else {
            pancakes.push(false);
        }
    }

    let count = 0;
    for (let p of pancakes) {
        if (!p) {
            let indexP = pancakes.indexOf(p);
            if (pancakes[(indexP + flips) - 1] !== undefined) {
                for (var j = 0; j < flips; j++) {
                    pancakes[j + indexP] = !pancakes[j + indexP];
                }
                count++;
            } else {
                return 'IMPOSSIBLE';
            }
        }
        if (isHappy(pancakes)) {
            return count;
        }
    }
    if (!isHappy(pancakes)) {
        return 'IMPOSSIBLE';
    }
};

function isHappy(pancakes) {
    for (let p of pancakes) {
        if (!p) {
            return false;
        }
    }
    return true;
}

