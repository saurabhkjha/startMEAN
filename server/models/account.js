var mongoose = require('mongoose'),
    _ = require('underscore')._,
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.join(__dirname, '..', '/config/config.js')),
    passportLocalMongoose = require('passport-local-mongoose'),
    crypto = require('crypto'),
    jwt = require('jwt-simple'),
    tokenSecret = 'emanagehealthbigsecret';

var Token = new Schema({
    token: {type: String},
    date_created: {type: Date, default: Date.now},
});
Token.statics.hasExpired= function(created) {
    var now = new Date();
    var diff = (now.getTime() - created);
    return diff > config.ttl;
};
var TokenModel = mongoose.model('Token', Token);

var Account = new Schema({
    email: { type: String, required: true, lowercase:true, index: { unique: true } },
    name: {type: String, required: true},
    mobile:{type:String,required:true},
    role:{type:String,required:true},
    center:{type:String,required:true},
    owner:{type:String,required:true},
    isOwner:{type:Boolean,required:true},
    date_created: {type: Date, default: Date.now},
    token: {type: Object},
});
Account.plugin(passportLocalMongoose, {usernameField: 'email'});

Account.statics.encode = function(data) {
    return jwt.encode(data, tokenSecret);
};
Account.statics.decode = function(data) {
    return jwt.decode(data, tokenSecret);
};

Account.statics.findUser = function(email, token, cb) {
    var self = this;
    this.findOne({email: email}, function(err, usr) {
        if(err || !usr) {
            cb(err, null);
        } else if (usr.token && usr.token.token && token === usr.token.token) {
            cb(false, {email: usr.email, token: usr.token, date_created: usr.date_created, full_name: usr.full_name});
        } else {
            cb(new Error('Token does not exist or does not match.'), null);
        }
    });
};

Account.statics.findUserByEmailOnly = function(email, cb) {
    var self = this;
    this.findOne({email: email}, function(err, usr) {
        if(err || !usr) {
            cb(err, null);
        } else {
            cb(false, usr);
        }
    });
};
Account.statics.createUserToken = function(email, cb) {
    var self = this;
    this.findOne({email: email}, function(err, usr) {
        if(err || !usr) {
            console.log('err');
        }
        //Create a token and add to user and save
        var token = self.encode({email: email});
        usr.token = new TokenModel({token:token});
        usr.save(function(err, usr) {
            if (err) {
                cb(err, null);
            } else {
                 cb(false, usr.token.token,usr.name,usr.role,usr.center);
            }
        });
    });
};

Account.statics.invalidateUserToken = function(email, cb) {
    var self = this;
    this.findOne({email: email}, function(err, usr) {
        if(err || !usr) {
            console.log('err');
        }
        usr.token = null;
        usr.save(function(err, usr) {
            if (err) {
                cb(err, null);
            } else {
                cb(false, 'removed');
            }
        });
    });
};


module.exports = mongoose.model('Account', Account);
module.exports.Token = TokenModel;
