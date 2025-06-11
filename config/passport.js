const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../model/userdet');
const config=require('../config/employeedb');

module.exports=function(passport){
    let opts={};
    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        User.findById(jwt_payload.user._id)
            .then(user => {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch(err => {
                return done(err, false);
            });
    }));
};


