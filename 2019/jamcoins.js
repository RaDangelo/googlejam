(function init() {
    var string = '';

    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', function () {
        string += process.stdin.read();
    });

    process.stdin.once('end', function () {
        main(new Input(string));
    });
}());

var main = function (input) {
    var id;
    var numTests = input.nextNumber();

    for (id = 1; id <= numTests; ++id) {
        console.log('Case #' + id + ': ' + solve(
            // Put parameters needed by test case here.
            input.nextString()
        ));
    }
};

var Input = function (string) {
    var items = null;
    var itemsIdx = 0;
    var itemsLen = 0;
    var space = /\s+/;
    var strings = string.split('\n');
    var stringsIdx = 0;
    var stringsLen = strings.length;

    var toNumber = function (obj) {
        console.assert(_.isFinite(+obj),
            'Cannot convert "' + obj + '" into number.');

        return +obj;
    };

    this.nextString = function () {
        console.assert(stringsIdx < stringsLen, 'No more input.');
        console.assert(!items || itemsIdx === itemsLen,
            'Unread array items:', items);

        items = null;
        return strings[stringsIdx++];
    };

    this.nextStringArray = function (sep) {
        return this.nextString().split(sep || space);
    };

    this.nextStringItem = function (sep) {
        if (!items || itemsIdx >= itemsLen) {
            items = this.nextStringArray(sep);
            itemsIdx = 0;
            itemsLen = items.length;
        }

        return items[itemsIdx++];
    };

    this.nextNumber = function () {
        return toNumber(this.nextString());
    };

    this.nextNumberArray = function (sep) {
        return this.nextStringArray(sep).map(toNumber);
    };

    this.nextNumberItem = function (sep) {
        return toNumber(this.nextStringItem(sep));
    };
};

function getCheckValues(n) {
    let a = getRandomInt(1, n);
    let b = n - a;

    if (!contains(a) && !contains(b)) {
        return `${a} ${b}`;
    } else {
        return getCheckValues(n);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function contains(n) {
    for (let char of n.toString()) {
        if (char == 4) {
            return true;
        }
    }
    return false;
}