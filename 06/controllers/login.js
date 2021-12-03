// const uuid = require('uuid/v4');
const passport = require('../libs/passport');
const Session = require('../models/Session');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.login = async function login(ctx, next) {
  await passport.authenticate('email-password', async (err, user, info) => {
    
    if (err) throw err;

    if (!user) {
      ctx.status = 500;
      ctx.body = info; // 'стратегия еще не подключена'
      return;
    }

    const token = jwt.sign({
      user: user.id,
      isAdmin: user.isAdmin,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 14,
    }, config.jwt);

    ctx.body = token;

  })(ctx, next);
};
