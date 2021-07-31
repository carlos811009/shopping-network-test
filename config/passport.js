const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Users } = require('../models')
const bcrypt = require('bcryptjs')


module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'account'
  }, async (account, password, done) => {
    try {
      const user = await Users.findOne({ account })
      if (!user) {
        return done(null, false, { message: 'Incorrect account.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      console.log(err)
    }
  }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findById(id)
      done(null, user)

    } catch (err) {
      return done(err, null)
    }
  })
}