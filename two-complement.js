function getTwoComplement(len) {
    if (len <= 1) throw new Error('Do you think it make sense?');

    var LEN = len = len || 32; // default to be 32

    var count = 0,
        bits = [];

    // set the priority of each bit
    while (len > 0) {
        bits[len - 1] = Math.pow(2, count);
        len--;
        count++;
    }
    // set the most significant bit as negative
    bits[0] = -bits[0];

    function TwoComplement(num) {
        this.num = num;
    }

    TwoComplement.prototype = {
        toHex: function toHex() {
            var bin = this.toBin();
            // Every 4-bit compose a hex
            return bin.replace(/\d{4,4}/g, function(match) {
                return (parseInt(match, 2)).toString(16).toUpperCase();
            });
        },
        toBin: function toBin() {
            var num = this.num;
            res = [];

            if (num < 0) {
                res[0] = 1;
                num -= bits[0];
            }

            var i = 1;
            while (num != 0 && i < LEN) {
                if (num - bits[i] >= 0) {
                    num -= bits[i];
                    res[i] = 1;
                }
                i++;
            }

            if (num != 0) {
                throw new Error(num + " out of " + LEN + "-bits range");
            }

            var s = '';
            for (i = 0; i < LEN; i++) {
                s += (res[i] ? res[i] : 0);
            }

            return s;
        }
    };

    TwoComplement.MIN = bits[0];
    TwoComplement.MAX = (function MAX() {
        var res = 0;
        for (var i = 1; i < LEN; i++) {
            res += bits[i];
        }
        return res;
    })();

    return TwoComplement;
}

var TwoComplementFactory = {
    get: getTwoComplement
};