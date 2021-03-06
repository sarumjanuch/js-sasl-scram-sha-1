var randomBytes = require('randombytes');


exports.parse = function (chal) {
    var dtives = {};
    var tokens = chal.split(/,(?=(?:[^"]|"[^"]*")*$)/);
    for (var i = 0, len = tokens.length; i < len; i++) {
        var dtiv = /(\w+)=["]?([^"]+)["]?$/.exec(tokens[i]);
        if (dtiv) {
            dtives[dtiv[1]] = dtiv[2];
        }
    }
    return dtives;
};

exports.saslname = function (name) {
    var escaped = [];
    var curr = '';
    for (var i = 0; i < name.length; i++) {
        curr = name[i];
        if (curr === ',') {
            escaped.push('=2C');
        } else if (curr === '=') {
            escaped.push('=3D');
        } else {
            escaped.push(curr);
        }
    }
    return escaped.join('');
};

exports.genNonce = function (len) {
    return randomBytes((len || 32) / 2).toString('hex');
};
