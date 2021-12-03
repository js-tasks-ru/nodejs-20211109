const Koa = require('koa');
const Router = require('koa-router');
const User = require('./models/User');
const handleValidationErrors = require('./lib/handleValidationErrors');
const mongoose = require('mongoose');

const app = new Koa();

app.use(require('koa-bodyparser')());

// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch(err) {
//     ctx.status = 500;
//     ctx.body = 'Internal server error';
//     console.error(err);
//   }
// });

const router = new Router();

router.get('/users', async (ctx, next) => {
  const users = await User.find({});

  ctx.body = users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email,
  }));
});

router.get('/users/:id', async (ctx, next) => {
  const user = await User.findById(ctx.params.id);

  if (!user) {
    ctx.throw(404, 'user can not be found');
  }

  ctx.body = {
    id: user._id,
    email: user.email,
    name: user.name,
  };
});

router.delete('/users/:id', async (ctx, next) => {
  const user = await User.findByIdAndDelete(ctx.params.id);

  if (!user) {
    ctx.throw(404, 'user can not be found');
  }

  ctx.body = {
    id: user._id,
    email: user.email,
    name: user.name,
  };
});

router.put('/users/:id', handleValidationErrors, async (ctx, next) => {
  const user = await User.findByIdAndUpdate(ctx.params.id, {
    email: ctx.request.body.email,
    name: ctx.request.body.name,
  }, {
    new: true,
    omitUndefined: true,
  });

  ctx.body = {
    id: user._id,
    email: user.email,
    name: user.name,
  };
});

router.post('/users', handleValidationErrors, async (ctx, next) => {
  const user = await User.create({
    email: ctx.request.body.email,
    name: ctx.request.body.name,
  });

  ctx.body = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
});

app.use(router.routes());

module.exports = app;
