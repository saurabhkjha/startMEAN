'use strict';

var path = require('path');
var mailer = require("nodemailer");
var config = require(path.join(__dirname, '/config/config.js'));
var Account = require(path.join(__dirname,  '/models/account'));
var Token = require(path.join(__dirname,  '/models/account')).Token;

var util = require(path.join(__dirname,  '/includes/util'));

/**
* @module Routes
*/

module.exports = function (app, passport) {
    
     app.get('/', function (req, res) {
       
    });
     app.get('/dashboard', function (req, res) {
      
    }); 

    /**
    * Post method to register a new user
    *
    * @param {Object} req the request object
    * @param {Object} res the response object
    */
    app.post('/register', function(req, res) {
        console.dir(req.body);
        var name = req.body.fullname;
        var email = req.body.email;
        var mobile = req.body.mobile;
        var role = req.body.role;
        var owner = req.body.owner;
        var isOwner = req.body.isOwner;
        var center = req.body.center;

        var password = util.randomPass(10);
        var user = new Account({name: name,email: email,mobile:mobile,role:role,owner:owner,isOwner:isOwner,center:center});
        var message;

        Account.register(user, password, function(error, account) {
            if (error) {
                if (error.name === 'BadRequesterroror' && error.message && error.message.indexOf('exists') > -1) {
                     res.json({error: 'Sorry. That email already exists. Try again.'});
                }
                else if (error.name === 'BadRequesterroror' && error.message && error.message.indexOf('argument not set')) {
                     res.json({error: 'missing somthing. Try again.'});
                }
                else {
                        console.log(error);
                      res.json({error: 'Facing some issue plz try later'});
                }

               
            }
            else {
                //Successfully registered user
                res.json({message: 'login Successfull, Please check your mail for details.'});
                var smtpTransport = mailer.createTransport("SMTP",{
                                                                    service: "Gmail",
                                                                    auth: {
                                                                        user: "emanagehealth@gmail.com",
                                                                        pass: "7406446615"
                                                                    }
                                                                });
                  var mail = {
                             from: "emanagehealth <emanagehealth@gmail.com>",
                             to: email,
                             subject: "eManageHealth",
                             text: "Congrats, Your Registration is successfull",
                             html: "<b>Congrats, Your Registration is successfull on eManageHealth!!!!</b><br/>password:"+password

                         };
                 smtpTransport.sendMail(mail, function(error, response){
                  if(error){
                     console.log(error);
                  }else{
                      console.log("Message sent: " + response.message);

                    }

                    smtpTransport.close();
                });
            }
        });
    });

    /**
    * Login method
    *
    * @param {Object} req the request object
    * @param {Object} res the response object
    */
    app.get('/login', function(req, res) {
          
    });

    app.post('/token/', passport.authenticate('local', {session: false}), function(req, res) {
        if (req.user) {
            Account.createUserToken(req.user.email, function(err, usersToken,usrname,usrrole,center) {
                // console.log('token generated: ' +usersToken);
                // console.log(err);
                if (err) {
                    res.json({error: 'Issue generating token'});
                } else {
                    res.json({token : usersToken,name:usrname,role:usrrole,center:center});
                }
            });
        } else {
            res.json({error: 'AuthError'});
        }
    });

   
    app.get('/logout(\\?)?', function(req, res) {
        var incomingToken = req.headers.token;
        if (incomingToken) {
            var decoded = Account.decode(incomingToken);
            if (decoded && decoded.email) {
                Account.invalidateUserToken(decoded.email, function(err, user) {
                     if (err) {
                        console.log(err);
                        res.json({error: 'user not found'});
                    } else {
                        res.json({message: 'logged out'});
                    }
                });
            } else {
                res.json({error: 'Facing some issue plz try later'});
            }
        }
    });

    app.get('/validate/', function(req, res) {
        var incomingToken = req.headers.token;
        var decoded = Account.decode(incomingToken);
        if (decoded && decoded.email) {
            Account.findUser(decoded.email, incomingToken, function(err, user) {
                if (err) {
                    console.log(err);
                    res.json({error: 'Issue finding user.'});
                } else {
                    if (Token.hasExpired(user.token.date_created)) {
                        console.log("Token expired.");
                        res.json({error: 'invalid'});
                    } else {
                        res.json({error:'valid'});
                    }
                }
            });
        } else {
            res.json({error: 'Facing some issue plz try later'});
        }
    });

     /**
    * Login method
    *
    * @param {Object} req the request object
    * @param {Object} res the response object
    */
    app.post('/registerStaff', function(req, res) {
        var name = req.body.docname;
        var email = req.body.emailid;
        var mobile = req.body.mobile;
        var regno = req.body.regno;
        var calcolor = req.body.calcolor;
        var role = req.body.role;

//       var owner = req.body.owner;
        var isOwner = false;
        var center = req.body.pcenter;

        var password = util.randomPass(10);
        var user = new Account({name: name,email: email,mobile:mobile,role:role,owner:email,isOwner:isOwner,center:center,regno:regno});
          Account.register(user, password, function(error, account) {
            if (error) {
                if (error.name === 'BadRequesterroror' && error.message && error.message.indexOf('exists') > -1) {
                     res.json({error: 'Sorry. That email already exists. Try again.'});
                }
                else if (error.name === 'BadRequesterroror' && error.message && error.message.indexOf('argument not set')) {
                     res.json({error: 'missing somthing. Try again.'});
                }
                else {
                        console.log(error);
                      res.json({error: 'Facing some issue plz try later'});
                }

               
            }
            else {
                //Successfully registered user
                res.json({message: 'login Successfull, Please check your mail for details.'});
                var smtpTransport = mailer.createTransport("SMTP",{
                                                                    service: "Gmail",
                                                                    auth: {
                                                                        user: "emanagehealth@gmail.com",
                                                                        pass: "7406446615"
                                                                    }
                                                                });
                  var mail = {
                             from: "emanagehealth <emanagehealth@gmail.com>",
                             to: email,
                             subject: "eManageHealth",
                             text: "Congrats, Your Registration is successfull",
                             html: "<b>Congrats, Your Registration is successfull on eManageHealth!!!!</b><br/>password:"+password

                         };
                 smtpTransport.sendMail(mail, function(error, response){
                  if(error){
                     console.log(error);
                  }else{
                      console.log("Message sent: " + response.message);

                    }

                    smtpTransport.close();
                });
            }
        });
          //res.json({msg:'sucess'});
    });
   

};
