var crypto = require('crypto');

var randomPass = function (len) {
    chars_caps = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
    chars = "abcdefghijklmnopqrstuwxyz0123456789";
   var rnd = crypto.randomBytes(len),
        value = new Array(len),
        len_caps = chars_caps.length;
    len = chars.length;
    value[0] = chars_caps[rnd[0] % len_caps];
    for (var i = 1; i < len; i++) {
        value[i] = chars[rnd[i] % len];
    }
    return value.join('');
   
};



exports.randomPass = randomPass;
