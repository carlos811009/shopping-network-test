const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models')

const bcrypt = require('bcryptjs')


passport.use(new LocalStrategy({
  usernameField: 'account',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, account, password, done) => {
  try {
    const user = await User.findOne({ where: { account } })

    if (!user) {
      return done(null, false, req.flash('error_msg', '查無此帳號'));
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, req.flash('error_msg', '密碼輸入錯誤！'));
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
    const user = await User.findByPk(id)
    done(null, user)
  } catch (err) {
    return done(err, null)
  }
})


module.exports = passport