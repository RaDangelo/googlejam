'use strict';
var fs = require('fs'),
    filePath = process.argv[2],
    contentLines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(String).slice(1);

contentLines.forEach(function (line, i) {
    console.log('Case #' + (i + 1) + ': ' + isTidyLarge(line.trim()));
});

// console.log('Case #' + (1) + ': ' + isTidyLarge('111111111111111110'));

function lastTidy(number) {
    while (!isTidySmall(number)) {
        number -= 1;
    };
    return number;
}

function isTidySmall(number) {
    let previous = 0;
    let narr = number.toString().split('');
    for (let n of narr) {
        if (n < previous) {
            return false;
        } else {
            previous = n;
        }
    }
    return true;
}

function isTidyLarge(number) {
    let previous = 0;
    let nums = number.toString().split('');
    if (!isTidySmall(number)) {
        for (let i = 0; i < nums.length; i++) {
            if (nums[i + 1] || i !== 0) {
                if (nums[i] < previous) {
                    nums[i - 1]--;
                    let first = (nums.slice(0, i).toString()).replace(/,/g, '');
                    let second = "9".repeat(nums.length - i);
                    let result = first + second;
                    return isTidyLarge(result);
                };
                previous = nums[i];
            }
        }
    }
    return number.replace('0', '');
}