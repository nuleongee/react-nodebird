const passport = require('passport');
const db = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 서버쪽에 [{ id: 3, cookie: 'asdfgb' }]
    return done(null, user.id);
  });
  passport.deserializeUser(async (user, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
      });
      return done(null, user); // req.user
    } catch (e) {
      console.log(e);
      return done(e);
    }
  });
};
