'use strict';
var fs = require('fs'),
    filePath = process.argv[2],
    contentLines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(String).slice(1);
var Long = require('Long');    

contentLines.forEach(function (line, i) {
    let people = getPeople(line);
    let stalls = getStalls(line);
    console.log('Case #' + (i + 1) + ': ' + bathroomStallsWise(people, stalls));
});


//test

// let people = getPeople("5 2");
// let stalls = getStalls("5 2");
// console.log('Case #' + (1) + ': ' + bathroomStallsWise(people, stalls));

function bathroomStallsWise(people, stalls) {

    people = Long.fromString(people);
    stalls = Long.fromString(stalls);    
    let count = 0;

    while ((Long.ONE.shl(count + 1).sub(1).lessThan(people))) {
        count++;
    }
    
    let diff = Long.ONE.shl(count);
    let previous = Long.ONE.shl(count).sub(1);
    let position = Long.ONE;

    if (count > 0) {
        position = people.sub(previous);
    }

    let size = stalls.sub(previous).div(diff);
    let mod = stalls.sub(previous).mod(diff);

    let actualSize = mod.gte(position) ? size.add(1) : size;
    let max = actualSize.div(2);
    let min = actualSize.sub(1).div(2);

    let result = max.toString() + ' ' + min.toString();

    return result;
}

function bathroomStallsBrutal(people, st) {
    let priority = [];
    let stalls = [];
    let middle;
    let rightmost = {};
    let leftmost = {};
    let result;
    stalls.length = st;
    stalls.fill(false);

    for (let p = 0; p < people; p++) {
        if (p === 0) {
            priority.push({ left: 0, right: stalls.length - 1 });
        }
        middle = Math.floor((priority[0].right + priority[0].left) / 2);
        stalls[middle] = true;
        rightmost = { left: middle + 1, right: priority[0].right };
        leftmost = { left: priority[0].left, right: middle - 1 };
        priority.splice(0, 1);
        priority.push(rightmost);
        priority.push(leftmost);
        priority.sort((a, b) => {
            return (b.right - b.left) - (a.right - a.left);
        }
        );
    }
    let left = Math.floor(((leftmost.right === 0 ? 1 : leftmost.right) + 1) - (leftmost.left));
    let right = Math.floor(((rightmost.right === st.length ? rightmost.right : rightmost.right) + 1)
        - rightmost.left);

    if (left > right) {
        result = (left < 0 ? '0' : left.toString()) + ' ' + (right < 0 ? '0' : right.toString());
    } else {
        result = (right < 0 ? '0' : right.toString()) + ' ' + (left < 0 ? '0' : left.toString());
    }

    return result;
}

function getPeople(line) {
    for (let i = 0; i < line.length; i++) {
        if (line.charAt(i) === ' ') {
            return (line.slice(i)).trim();
        }
    }
}

function getStalls(line) {
    for (let i = 0; i < line.length; i++) {
        if (line.charAt(i) === ' ') {
            return (line.slice(0, i)).trim();
        }
    }
}