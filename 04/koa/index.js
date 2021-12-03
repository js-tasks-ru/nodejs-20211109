const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(serve('public'));

function mustBeAdmin(ctx, next) {
    const role = ctx.params.role;
    if (role !== 'admin') {
        ctx.throw(403);
    }
    return next();
}

app.use(async (ctx, next) => {
    const now = Date.now();

    await next();

    // console.log('handled request', ctx.url, ctx.method, `took: ${Date.now() - now}ms`, `response size: ${Buffer.from(JSON.stringify(ctx.body)).byteLength}b`);
});

// /user/alexey/ivanov
router.get('/user/:role/:name/:surname', mustBeAdmin, async (ctx, next) => {
    ctx.body = `Hello ${ctx.params.name} ${ctx.params.surname}`;
});

app.use(router.routes());
app.listen(3000);


/**
 * 
 * function middleware() {
 *   return new Promise(resolve => setTimeout(resolve, 2000));
 * }
 * 
 * Promise.resolve()
 *  .then(() => {
 *      return middleware();
 *  })
 *  .then(() => {
 *      return middleware();
 *  })
    .catch(err => {
 *      
 *  })
 *  .then(() => {
 *      return middleware();
 *  })
 *  .then(() => {
 *      return middleware();
 *  })
 *  .catch(err => {
 *      
 *  })
 * 
 */