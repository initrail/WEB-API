var passport = require('passport')
var basicStrategy = require('passport-http').BasicStrategy

passport.use(new basicStrategy(
    function(username, password, done){
        var user = { name: 'mytestuser' }
        if (username == user.name && password == 'password1') {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
)

exports.isAuthenticated = passport.authenticate('basic', {session : false})
